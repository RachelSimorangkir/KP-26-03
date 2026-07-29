<!DOCTYPE html>
<html>
<head>
    <title>Daftar Berita</title>
</head>
<body>
    <h1>Daftar Berita Kegiatan</h1>
    
    <a href="<?= base_url('berita/tambah') ?>">+ Tambah Berita Baru</a>
    <br><br>

    <?php if (session()->getFlashdata('success')): ?>
        <p style="color: green;"><?= session()->getFlashdata('success') ?></p>
    <?php endif; ?>

    <table border="1" cellpadding="10">
        <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Status</th>
        </tr>
        <?php foreach ($berita as $b): ?>
        <tr>
            <td><?= $b->judul ?></td>
            <td><?= $b->nama_kategori ?></td>
            <td><?= $b->status ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>