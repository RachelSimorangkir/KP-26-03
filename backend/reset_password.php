<?php
/**
 * Script untuk reset password semua user menjadi 'pegawai123'
 * PENTING: Hapus file ini setelah selesai!
 */

// Load file .env secara manual
$envFile = __DIR__ . '/.env';
if (!file_exists($envFile)) {
    die('File .env tidak ditemukan!');
}

$env = [];
$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    if (strpos($line, '#') === 0) continue;
    if (strpos($line, '=') !== false) {
        list($key, $value) = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
}

// Koneksi ke database
try {
    $dsn = sprintf(
        'pgsql:host=%s;port=%s;dbname=%s',
        $env['database.default.hostname'] ?? 'localhost',
        $env['database.default.port'] ?? '5432',
        $env['database.default.database'] ?? 'neondb'
    );
    
    $pdo = new PDO($dsn, $env['database.default.username'], $env['database.default.password']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h2>🔄 Reset Password User</h2>";
    echo "<hr>";
    
    // Password default yang akan di-set
    $defaultPassword = 'pegawai123';
    $hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);
    
    // Ambil semua user
    $stmt = $pdo->query("SELECT id, nama, nip, role FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<p>Ditemukan <strong>" . count($users) . "</strong> user.</p>";
    echo "<table border='1' cellpadding='5'>";
    echo "<tr><th>ID</th><th>Nama</th><th>NIP</th><th>Role</th><th>Status</th></tr>";
    
    $updated = 0;
    foreach ($users as $user) {
        $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        $success = $updateStmt->execute([$hashedPassword, $user['id']]);
        
        $status = $success ? "✅ Berhasil" : "❌ Gagal";
        if ($success) $updated++;
        
        echo "<tr>";
        echo "<td>{$user['id']}</td>";
        echo "<td>{$user['nama']}</td>";
        echo "<td>{$user['nip']}</td>";
        echo "<td>{$user['role']}</td>";
        echo "<td>{$status}</td>";
        echo "</tr>";
    }
    
    echo "</table>";
    echo "<hr>";
    echo "<h3>✅ Selesai! {$updated} dari " . count($users) . " user berhasil direset.</h3>";
    echo "<p><strong>Password baru untuk semua user:</strong> <code>{$defaultPassword}</code></p>";
    echo "<p><strong>Cara Login:</strong></p>";
    echo "<ul>";
    echo "<li>Username/NIP: <code>197101152001122001</code> (atau NIP user lainnya)</li>";
    echo "<li>Password: <code>{$defaultPassword}</code></li>";
    echo "</ul>";
    
    echo "<p style='color:red; font-weight:bold;'>⚠️ PENTING: HAPUS FILE INI SEKARANG JUGA!</p>";
    
} catch (PDOException $e) {
    echo "<h3 style='color:red;'>❌ Error Koneksi Database:</h3>";
    echo "<pre>" . $e->getMessage() . "</pre>";
    echo "<p>Cek konfigurasi di file <code>.env</code></p>";
}
?>
