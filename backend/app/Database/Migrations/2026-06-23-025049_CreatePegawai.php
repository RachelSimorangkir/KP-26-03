<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePegawai extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'SERIAL',
            ],
            'nip' => [
                'type' => 'VARCHAR',
                'constraint' => 30,
            ],
            'nama' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
            ],
            'jabatan' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
            ],
            'pangkat_golongan' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
            ],
            'unit_organisasi' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('pegawai');
    }

    public function down()
    {
        $this->forge->dropTable('pegawai');
    }
}