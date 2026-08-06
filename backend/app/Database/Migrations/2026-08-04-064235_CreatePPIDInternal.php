<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePPIDInternal extends Migration
{
    public function up()
    {
        $this->forge->addField([

            'id' => [
                'type'           => 'BIGINT',
                'constraint'     => 20,
                'unsigned'       => true,
                'auto_increment' => true,
            ],

            'nomor_registrasi' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
                'null'       => true,
            ],

            'user_id' => [
                'type'       => 'BIGINT',
                'constraint' => 20,
                'null'       => true,
            ],

            // =========================
            // Data Pengaju
            // =========================

            'nip_pengaju' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
            ],

            'nama_pengaju' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
            ],

            'unit_pengaju' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],

            'email' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
                'null'       => true,
            ],

            'no_hp' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
                'null'       => true,
            ],

            // =========================
            // Permohonan
            // =========================

            'jenis_permohonan' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],

            'referensi_permohonan' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
                'null'       => true,
            ],

            'uraian_permohonan' => [
                'type' => 'TEXT',
            ],

            'unit_tujuan' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
            ],

            'tingkat_urgensi' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
            ],


            // =========================
            // Lampiran
            // =========================

            'lampiran' => [
                'type' => 'TEXT',
                'null' => true,
            ],

            // =========================
            // Diproses Admin
            // =========================

            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
                'default'    => 'baru',
            ],

            'petugas_ppid' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
                'null'       => true,
            ],

            'tanggapan' => [
                'type' => 'TEXT',
                'null' => true,
            ],

            'catatan_internal' => [
                'type' => 'TEXT',
                'null' => true,
            ],

            'processed_at' => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ],

            // =========================
            // Timestamp
            // =========================

            'created_at' => [
            'type' => 'TIMESTAMP',
            'null' => true,
            ],

           'updated_at' => [
           'type' => 'TIMESTAMP',
           'null' => true,
         ],
        ]);

        $this->forge->addKey('id', true);

        $this->forge->addUniqueKey('nomor_registrasi');

        $this->forge->addKey('status');

        $this->forge->addKey('tingkat_urgensi');

       $this->forge->addKey('created_at');

       $this->forge->createTable('ppid_internal');
    }

    public function down()
    {
        $this->forge->dropTable('ppid_internal');
    }
}