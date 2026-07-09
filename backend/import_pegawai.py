import pandas as pd
import psycopg2

# ===== BACA EXCEL =====
file_excel = r"D:\Data Pegawai Direktorat Jenderal Bimbingan Masyarakat Kristen.xlsx"

df = pd.read_excel(
    file_excel,
    dtype={
        "NIP": str
    }
)

# ===== GANTI NAMA KOLOM =====
df = df.rename(columns={
    "NAMA": "nama",
    "NIP": "nip",
    "JABATAN": "jabatan",
    "PANGKAT/GOLONGAN": "pangkat_golongan",
    "UNIT ORGANISASI": "unit_organisasi"
})

# ===== AMBIL KOLOM YANG DIPERLUKAN =====
df = df[
    [
        "nip",
        "nama",
        "jabatan",
        "pangkat_golongan",
        "unit_organisasi"
    ]
]

# NIP jadi string
df["nip"] = (
    df["nip"]
    .astype(str)
    .str.replace(".0", "", regex=False)
    .str.strip()
)

# ===== KONEKSI DATABASE =====
conn = psycopg2.connect(
    host="localhost",
    database="KP-26-103-A",
    user="postgres",
    password="rachell2005"
)

cur = conn.cursor()

# ===== INSERT DATA =====
for _, row in df.iterrows():
    cur.execute("""
        INSERT INTO pegawai
        (
            nip,
            nama,
            jabatan,
            pangkat_golongan,
            unit_organisasi
        )
        VALUES (%s,%s,%s,%s,%s)
    """,
    (
        row["nip"],
        row["nama"],
        row["jabatan"],
        row["pangkat_golongan"],
        row["unit_organisasi"]
    ))

conn.commit()

print(f"{len(df)} pegawai berhasil diimport!")

cur.close()
conn.close()