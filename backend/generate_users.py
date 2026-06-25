import psycopg2
import subprocess

conn = psycopg2.connect(
    host="localhost",
    database="KP-26-103-A",
    user="postgres",
    password="rachell2005"
)

cur = conn.cursor()

cur.execute("""
SELECT nip, nama
FROM pegawai
""")

pegawai = cur.fetchall()

jumlah = 0

for nip, nama in pegawai:

    password_awal = str(nip)

    password_hash = subprocess.check_output(
        [
            "php",
            "-r",
            f'echo password_hash("{password_awal}", PASSWORD_DEFAULT);'
        ]
    ).decode().strip()

    cur.execute("""
        INSERT INTO users
        (
            nama,
            email,
            password,
            role,
            nip
        )
        VALUES
        (%s,%s,%s,%s,%s)
    """,
    (
        nama,
        f"{nip}@pegawai.local",
        password_hash,
        "pegawai",
        str(nip)
    ))

    jumlah += 1

conn.commit()

print(f"{jumlah} akun berhasil dibuat")

cur.close()
conn.close()