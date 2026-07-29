<!DOCTYPE html>
<html>
<head>
    <title>Login - Jendela Layanan Bimas Kristen</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
        .login-container { max-width: 400px; margin: 50px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .login-container h2 { text-align: center; color: #333; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .form-group button { width: 100%; padding: 10px; background: #004085; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .error { color: red; font-size: 12px; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login Sistem</h2>
        
        <?php if (isset($error)): ?>
            <p class="error"><?= $error ?></p>
        <?php endif; ?>

        <form action="<?= base_url('login') ?>" method="POST">
            <div class="form-group">
                <label for="nip">NIP</label>
                <input type="text" id="nip" name="nip" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit">Masuk</button>
        </form>
    </div>
</body>
</html>