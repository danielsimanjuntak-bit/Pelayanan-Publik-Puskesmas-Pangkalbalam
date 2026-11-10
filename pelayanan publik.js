function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      resolve("");
    }
  });
}

document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const fileInput = document.getElementById('lampiranFoto');
  let fotoBase64Data = "";

  if (fileInput && fileInput.files.length > 0) {
    fotoBase64Data = await getBase64(fileInput.files[0]);
  }

  const payload = {
    noPengaduan: "ADU-" + Date.now(),
    tglPengaduan: document.getElementById('tglPengaduan')?.value || "",
    media: document.getElementById('media')?.value || "",
    nama: document.getElementById('nama')?.value || "",
    isiAduan: document.getElementById('isiAduan')?.value || "",
    tindakLanjut: document.getElementById('tindakLanjut')?.value || "",
    tglTL: document.getElementById('tglTL')?.value || "",
    statusTL: document.getElementById('statusTL')?.value || "",
    durasi: document.getElementById('durasi')?.value || "",
    kesimpulan: document.getElementById('kesimpulan')?.value || "",
    fotoBase64: fotoBase64Data
  };

  fetch('https://script.google.com/macros/s/AKfycbw5VjBLMQceWgMboo6R8Zx5r2tSJgiDyP56SfIWSfRU2G_KftUpctH7Dak-HV6DbSt-/exec', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === "success") {
      alert("Pengaduan dan Foto Berhasil Terkirim!");
      this.reset();
    } else {
      alert("Gagal: " + data.error);
    }
  })
  .catch(err => console.error(err));
});