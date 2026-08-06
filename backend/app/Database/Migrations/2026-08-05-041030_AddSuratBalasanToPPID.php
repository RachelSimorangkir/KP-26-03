<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSuratBalasanToPPID extends Migration
{
    public function up()
{
    $fields = [

        'surat_balasan' => [

            'type' => 'TEXT',

            'null' => true,

            'after' => 'lampiran'

        ]

    ];

    $this->forge->addColumn('ppid_internal', $fields);
}

public function down()
{
    $this->forge->dropColumn(
        'ppid_internal',
        'surat_balasan'
    );
}
}
