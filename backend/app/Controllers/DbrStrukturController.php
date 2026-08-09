<?php
namespace App\Controllers;

use App\Models\DbrEselonModel;
use App\Models\DbrBagianModel;
use App\Models\DbrBagianPegawaiModel;
use App\Models\DbrBarangModel;
use Config\Database;

class DbrStrukturController extends BaseController
{
    private $tabelLegacyDiizinkan = [
        'dbr_pendidikan_dasar',
        'dbr_subdit_pendidikan_menengah',
        'dbr_subdit_pendidikan_tinggi',
        'dbr_tu_pendidikan',
        'barang_tanpa_nup_tu_pendidikan',
        'barang_tidak_ada_kode_dbr_pendidikan_menengah',
    ];

    // GET /api/dbr-struktur
    public function index()
    {
        $eselonModel  = new DbrEselonModel();
        $bagianModel  = new DbrBagianModel();
        $mapModel     = new DbrBagianPegawaiModel();
        $barangManual = new DbrBarangModel();
        $db           = Database::connect();
        $eselons = $eselonModel->orderBy('urutan', 'ASC')->orderBy('id', 'ASC')->findAll();
        $result = [];

        foreach ($eselons as $es) {
            $bagians = $bagianModel
                ->where('eselon_id', $es['id'])
                ->orderBy('urutan', 'ASC')
                ->orderBy('id', 'ASC')
                ->findAll();
            $bagianList = [];
            foreach ($bagians as $bg) {
                $pegawaiList = [];

                // ── Sumber 1: pegawai di-assign via NIP (dari dbr_lt10) ──
                $maps = $mapModel->where('bagian_id', $bg['id'])->findAll();
                foreach ($maps as $m) {
                    $rows = $db->table('dbr_lt10')->where('nip', $m['nip'])->where('bmn !=', 'Barang Default')->get()->getResultArray();
                    if (empty($rows)) {
                        $pegawaiList[] = ["nip" => $m['nip'], "nama" => "(Data pegawai tidak ditemukan)", "jabatan" => "", "barang" => []];
                        continue;
                    }
                    $barang = array_map(function ($r) {
                        return ["id" => "lt10-" . $r['id'], "nama" => $r['bmn'], "nup" => $r['nup'], "kondisi" => $r['kondisi']];
                    }, $rows);
                    $pegawaiList[] = ["nip" => $m['nip'], "nama" => $rows[0]['nama'], "jabatan" => $rows[0]['jabatan'], "barang" => $barang];
                }

                // ── Sumber 2: barang manual ("Tambah DBR") ──
                $manualRows = $barangManual->where('bagian_id', $bg['id'])->orderBy('id', 'ASC')->findAll();
                $manualByNip = [];
                foreach ($manualRows as $r) {
                    $key = $r['nip'] ?: ('noNIP-' . $r['id']);
                    if (!isset($manualByNip[$key])) {
                        $manualByNip[$key] = ["nip" => $r['nip'], "nama" => $r['nama_pegawai'], "jabatan" => $r['jabatan'], "barang" => []];
                    }
                    $manualByNip[$key]['barang'][] = ["id" => "manual-" . $r['id'], "nama" => $r['nama_barang'], "nup" => $r['nup'], "kondisi" => $r['kondisi']];
                }
                foreach ($manualByNip as $data) {
                    $existingIdx = null;
                    foreach ($pegawaiList as $idx => $p) {
                        if ($data['nip'] !== '' && $p['nip'] === $data['nip']) { $existingIdx = $idx; break; }
                    }
                    if ($existingIdx !== null) {
                        $pegawaiList[$existingIdx]['barang'] = array_merge($pegawaiList[$existingIdx]['barang'], $data['barang']);
                    } else {
                        $pegawaiList[] = $data;
                    }
                }

                // ── Sumber 3: tabel legacy (barang ruangan, tanpa NIP) ──
                if (!empty($bg['sumber_tabel'])) {
                    $daftarTabel = array_map('trim', explode(',', $bg['sumber_tabel']));
                    $byPengguna = [];
                    foreach ($daftarTabel as $tabel) {
                        if (!in_array($tabel, $this->tabelLegacyDiizinkan)) continue;
                        $legacyRows = $db->table($tabel)->get()->getResultArray();
                        foreach ($legacyRows as $r) {
                            $penggunaName = $r['pengguna'] ?? null;
                            $key = $penggunaName ?: '__ruangan__';
                            if (!isset($byPengguna[$key])) {
                                $byPengguna[$key] = [
                                    "nip"     => null,
                                    "nama"    => $penggunaName ?: ("Inventaris Ruangan — " . $bg['nama']),
                                    "jabatan" => "",
                                    "barang"  => [],
                                ];
                            }

                            $byPengguna[$key]['barang'][] = [
                                "id"      => $tabel . '-' . $r['id'],
                                "nama"    => $r['nama_barang'],
                                "nup"     => $r['nup'],
                                "kondisi" => $r['keterangan'] ?? '-',
                            ];
                        }
                    }

                    $pegawaiList = array_merge($pegawaiList, array_values($byPengguna));
                }

                $bagianList[] = ["id" => $bg['id'], "nama" => $bg['nama'], "pegawai" => $pegawaiList];
            }

            $result[] = [
                "id" => $es['id'], "nama" => $es['nama'], "label" => $es['label'],
                "warna" => $es['warna'], "warnaBg" => $es['warna_bg'], "bagian" => $bagianList,
            ];
        }
        return $this->response->setJSON($result);
    }

    // GET /api/dbr-struktur/cari-pegawai?q=...
    public function searchPegawai()
    {
        $q  = $this->request->getGet('q') ?? '';
        $db = Database::connect();
        $builder = $db->table('dbr_lt10')->select('nip, nama, jabatan')->groupBy('nip, nama, jabatan');
        if ($q !== '') $builder->groupStart()->like('nama', $q)->orLike('nip', $q)->groupEnd();
        return $this->response->setJSON($builder->orderBy('nama', 'ASC')->get()->getResultArray());
    }

    // ESELON
    public function storeEselon()
    {
        $json = $this->request->getJSON(true);
        $id = (new DbrEselonModel())->insert([
            "nama" => $json["nama"], "label" => $json["label"] ?? "",
            "warna" => $json["warna"] ?? "#2563eb", "warna_bg" => $json["warnaBg"] ?? "#eff6ff",
            "urutan" => $json["urutan"] ?? 0,
        ]);
        return $this->response->setJSON(["success" => true, "id" => $id]);
    }

    public function updateEselon(int $id)
    {
        $json = $this->request->getJSON(true);
        (new DbrEselonModel())->update($id, [
            "nama" => $json["nama"], "label" => $json["label"] ?? "",
            "warna" => $json["warna"] ?? "#2563eb", "warna_bg" => $json["warnaBg"] ?? "#eff6ff",
        ]);
        return $this->response->setJSON(["success" => true]);
    }

    public function deleteEselon(int $id)
    {
        (new DbrEselonModel())->delete($id);
        return $this->response->setJSON(["success" => true]);
    }

    // BAGIAN
    public function storeBagian()
    {
        $json = $this->request->getJSON(true);
        $id = (new DbrBagianModel())->insert(["eselon_id" => $json["eselonId"], "nama" => $json["nama"], "urutan" => $json["urutan"] ?? 0]);
        return $this->response->setJSON(["success" => true, "id" => $id]);
    }

    public function updateBagian(int $id)
    {
        $json = $this->request->getJSON(true);
        (new DbrBagianModel())->update($id, ["nama" => $json["nama"]]);
        return $this->response->setJSON(["success" => true]);
    }

    public function deleteBagian(int $id)
    {
        (new DbrBagianModel())->delete($id);
        return $this->response->setJSON(["success" => true]);
    }

    // ASSIGN / HAPUS PEGAWAI (via NIP dari dbr_lt10)
    public function addPegawai(int $bagianId)
    {
        $json = $this->request->getJSON(true);
        $model = new DbrBagianPegawaiModel();
        $existing = $model->where('bagian_id', $bagianId)->where('nip', $json["nip"])->first();
        if ($existing) return $this->response->setJSON(["success" => false, "message" => "Pegawai ini sudah ada di bagian tersebut."]);
        $model->insert(["bagian_id" => $bagianId, "nip" => $json["nip"]]);
        return $this->response->setJSON(["success" => true]);
    }

    public function removePegawai(int $bagianId, string $nip)
    {
        (new DbrBagianPegawaiModel())->where('bagian_id', $bagianId)->where('nip', $nip)->delete();
        return $this->response->setJSON(["success" => true]);
    }

    // TAMBAH DBR MANUAL
    public function storeBarang(int $bagianId)
    {
        try {
            $json = $this->request->getJSON(true);
            $model = new DbrBarangModel();

            foreach ($json["barang"] as $item) {
                $model->insert([
                    "bagian_id" => $bagianId, "nama_pegawai" => $json["nama"], "nip" => $json["nip"], "jabatan" => $json["jabatan"],
                    "nama_barang" => $item["nama"], "nup" => $item["nup"], "kondisi" => $item["kondisi"] ?? "Baik",
                ]);
            }
            return $this->response->setJSON(["success" => true, "message" => "DBR berhasil ditambahkan."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    public function deleteBarang(int $id)
    {
        (new DbrBarangModel())->delete($id);
        return $this->response->setJSON(["success" => true]);
    }
}