import psycopg2

try:
    conn = psycopg2.connect(
        host="localhost",
        database="KP-26-103-A",
        user="postgres",
        password="rachell2005"
    )

    print("Koneksi berhasil!")

    conn.close()

except Exception as e:
    print(e)