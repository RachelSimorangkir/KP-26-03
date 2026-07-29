<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Pengajuan Publikasi - Jendela Layanan Bimas Kristen</title>
    <link rel="stylesheet" href="<?= base_url('css/FormPengajuan.css') ?>">
    <style>
        /* CSS Inline untuk memastikan tampilan langsung jalan */
        .rekom-page { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .rekom-header { margin-bottom: 20px; }
        .back-button { background: #004085; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        .back-button:hover { background: #002d5f; }
        .service-banner { background: linear-gradient(135deg, #004085 0%, #0066cc 100%); color: white; padding: 40px 20px; border-radius: 10px; margin-bottom: 30px; }
        .service-banner-content h1 { margin: 0 0 10px 0; font-size: 2em; }
        .service-banner-content p { margin: 0; opacity: 0.9; }
        .form-pengajuan { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .description-card { margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
        .description-card h2 { margin-top: 0; color: #004085; border-bottom: 2px solid #004085; padding-bottom: 10px; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; }
        .form-group textarea { resize: vertical; }
        .form-group.full-width { grid-column: 1 / -1; }
        .readonly-input { background: #e9ecef; cursor: not-allowed; }
        .required { color: red; }
        .input-error { border-color: red !important; }
        .error-text { color: red; font-size: 12px; margin-top: 5px; display: block; }
        .error-summary { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .error-summary ul { margin: 10px 0 0 0; padding-left: 20px; }
        .file-list { margin-top: 10px; }
        .file-item { background: #e9ecef; padding: 8px; border-radius: 5px; margin-bottom: 5px; font-size: 13px; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 30px; }
        .btn-primary { background: #004085; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; font-size: 16px; }
        .btn-primary:hover { background: #002d5f; }
        .btn-secondary { background: #6c757d; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; font-size: 16px; }
        .btn-secondary:hover { background: #545b62; }
        .success-message { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>

<div class="rekom-page">
    <!-- BACK BUTTON -->
    <div class="rekom-header">
        <button class="back-button" onclick="window.history.back()">← Kembali</button>
    </div>

    <!-- BANNER -->
    <section class="service-banner">
        <div class="service-banner-content">
            <h1>Form Pengajuan Publikasi</h1>
            <p>Lengkapi formulir di bawah ini untuk mengajukan publikasi berita kegiatan.</p>
        </div>
    </section>

    <!-- SUCCESS MESSAGE -->
    <?php if (session()->getFlashdata('success')): ?>
        <div class="success-message">
            ✅ <?= session()->getFlashdata('success') ?>
        </div>
    <?php endif; ?>

    <!-- ERROR MESSAGE -->
    <?php if (session()->getFlashdata('errors')): ?>
        <div class="error-summary">
            <strong>⚠️ Terdapat <?= count(session()->getFlashdata('errors')) ?> kesalahan:</strong>
            <ul>
                <?php foreach (session()->getFlashdata('errors') as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <!-- FORM -->
    <form class="form-pengajuan" action="<?= base_url('berita/simpan') ?>" method="POST" enctype="multipart/form-data">
        
        <!-- Info Pengusul -->
        <section class="description-card">
            <h2>Data Pengusul</h2>
            <div class="form-grid">
                <div class="form-group">
                    <label>NIP Pengusul</label>
                    <input type="text" value="<?= session()->get('nip') ?: 'ADMIN001' ?>" readonly class="readonly-input">
                </div>
                <div class="form-group">
                    <label>Nama Pengusul</label>
                    <input type="text" value="<?= session()->get('nama_lengkap') ?: 'Administrator Humas' ?>" readonly class="readonly-input">
                </div>
                <div class="form-group">
                    <label>Satuan Kerja</label>
                    <input type="text" value="<?= session()->get('satuan_kerja') ?: 'Ditjen Bimas Kristen' ?>" readonly class="readonly-input">
                </div>
            </div>
        </section>

        <!-- Detail Berita -->
        <section class="description-card">
            <h2>Detail Berita</h2>
            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Judul Berita <span class="required">*</span></label>
                    <input type="text" name="judul" value="<?= old('judul') ?>" placeholder="Masukkan judul berita" class="<?= isset($errors['judul']) ? 'input-error' : '' ?>">
                    <?php if (isset($errors['judul'])): ?>
                        <span class="error-text"><?= $errors['judul'] ?></span>
                    <?php endif; ?>
                </div>

                <div class="form-group">
                    <label>Kategori Kegiatan <span class="required">*</span></label>
                    <select name="kategori_id" class="<?= isset($errors['kategori_id']) ? 'input-error' : '' ?>">
                        <option value="">-- Pilih Kategori --</option>
                        <?php foreach ($kategori as $kat): ?>
                            <option value="<?= $kat->id ?>" <?= old('kategori_id') == $kat->id ? 'selected' : '' ?>>
                                <?= $kat->nama_kategori ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                    <?php if (isset($errors['kategori_id'])): ?>
                        <span class="error-text"><?= $errors['kategori_id'] ?></span>
                    <?php endif; ?>
                </div>

                <div class="form-group">
                    <label>Tanggal Kegiatan <span class="required">*</span></label>
                    <input type="date" name="tanggal_kegiatan" value="<?= old('tanggal_kegiatan') ?>" class="<?= isset($errors['tanggal_kegiatan']) ? 'input-error' : '' ?>">
                    <?php if (isset($errors['tanggal_kegiatan'])): ?>
                        <span class="error-text"><?= $errors['tanggal_kegiatan'] ?></span>
                    <?php endif; ?>
                </div>

                <div class="form-group">
                    <label>Waktu Kegiatan</label>
                    <input type="time" name="waktu_kegiatan" value="<?= old('waktu_kegiatan') ?>">
                </div>

                <div class="form-group full-width">
                    <label>Lokasi Kegiatan <span class="required">*</span></label>
                    <input type="text" name="lokasi_kegiatan" value="<?= old('lokasi_kegiatan') ?>" placeholder="Masukkan lokasi kegiatan" class="<?= isset($errors['lokasi_kegiatan']) ? 'input-error' : '' ?>">
                    <?php if (isset($errors['lokasi_kegiatan'])): ?>
                        <span class="error-text"><?= $errors['lokasi_kegiatan'] ?></span>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <!-- Konten Berita -->
        <section class="description-card">
            <h2>Konten Berita</h2>
            <div class="form-group full-width">
                <label>Isi Berita / Narasi <span class="required">*</span></label>
                <textarea name="isi_berita" rows="10" placeholder="Tulis isi berita dengan lengkap..." class="<?= isset($errors['isi_berita']) ? 'input-error' : '' ?>"><?= old('isi_berita') ?></textarea>
                <?php if (isset($errors['isi_berita'])): ?>
                    <span class="error-text"><?= $errors['isi_berita'] ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group full-width">
                <label>Foto/Video Dokumentasi <span class="required">*</span></label>
                <input type="file" name="foto[]" multiple accept="image/*,video/*" class="<?= isset($errors['foto']) ? 'input-error' : '' ?>">
                <small>Minimal 1 file (gambar atau video). Maksimal 8MB per file.</small>
                <?php if (isset($errors['foto'])): ?>
                    <span class="error-text"><?= $errors['foto'] ?></span>
                <?php endif; ?>
            </div>
        </section>

        <!-- Submit Buttons -->
        <div class="form-actions">
            <button type="button" class="btn-secondary" onclick="window.location.href='<?= base_url('berita') ?>'">Batal</button>
            <button type="submit" class="btn-primary">Ajukan Publikasi</button>
        </div>
    </form>
</div>

</body>
</html>