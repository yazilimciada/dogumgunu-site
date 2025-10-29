// Hoş geldin alert
alert("Kendine özel isim oluştur, gizliliğini sağla ve sitende keyfine bak!");

// Maksimum doğum yılı
document.getElementById("dogumtarihi").max = new Date().getFullYear();

// --- CUSTOM SELECT ---
const selectBox = document.querySelector(".select-box");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
const hiddenInput = document.getElementById("renkler");

selectBox.addEventListener("click", () => {
  optionsContainer.style.display = optionsContainer.style.display === "block" ? "none" : "block";
});

let selectedColors = [];

optionsList.forEach(opt => {
  opt.addEventListener("click", () => {
    opt.classList.toggle("selected");
    const val = opt.getAttribute("data-value");
    if (selectedColors.includes(val)) selectedColors = selectedColors.filter(c=>c!==val);
    else selectedColors.push(val);
    hiddenInput.value = selectedColors.join(",");
    selectBox.textContent = selectedColors.length ? selectedColors.join(", ") : "Renkleri seçin...";
  });
});

// --- FORM VE İSİM SEÇİMİ ---
const kutlaBtn = document.getElementById("kutlaBtn");
const isimSecimiBox = document.getElementById("isimSecimi");
const mesajAlani = document.getElementById("mesaj");
const dogumForm = document.getElementById("dogumForm");

kutlaBtn.addEventListener("click", function(e){
  e.preventDefault();

  const ad = document.getElementById("Adınız").value.trim();
  const soyad = document.getElementById("Soyisminiz").value.trim();
  const email = document.getElementById("email").value.trim();
  const yil = document.getElementById("dogumtarihi").value;

  if (!ad || !soyad || !email || !yil) { alert("Lütfen tüm bilgileri doldur!"); return; }

  dogumForm.style.display = "none";
  isimSecimiBox.style.display = "block";

  document.querySelectorAll(".secimBtn").forEach(btn => {
    btn.addEventListener("click", function handler(){
      btn.removeEventListener("click", handler);

      const tur = btn.getAttribute("data-tur");
      let displayName = tur==="username" ? ad : ad + " " + soyad;

      isimSecimiBox.style.display = "none";

      const yas = new Date().getFullYear() - parseInt(yil,10);
      mesajAlani.textContent = `🎂 İYİ DOĞDUN ${displayName}! ${yas} yaşına girdin! 🎉`;
      mesajAlani.style.display = "block";
      mesajAlani.style.animation = "fadeIn 1s ease-in";

      startHavaiFisek();
    }, {once:true});
  });
});

// --- BASİT KONFETİ / HAVAİ FİŞEK ---
function startHavaiFisek() {
  const canvas = document.getElementById("havaiFisekCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

 const renkSecenekleri = hiddenInput.value.split(",").filter(c => c !== "").length
  ? hiddenInput.value.split(",").filter(c => c !== "")
  : ["red","blue","green","yellow","purple"];


  function konfeti() {
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height;
    const r = Math.random()*8 + 2;
    const renk = renkSecenekleri[Math.floor(Math.random()*renkSecenekleri.length)];
    ctx.fillStyle = renk;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  }

  const interval = setInterval(konfeti, 200);

  setTimeout(()=>clearInterval(interval),5000); // 5 saniye sonra dur
}
