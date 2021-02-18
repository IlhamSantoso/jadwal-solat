const date = new Date();

function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

function time() {
    var d = new Date();
    var s = addZero(d.getSeconds());
    var m = addZero(d.getMinutes());
    var h = addZero(d.getHours());
    document.getElementById('waktu').innerText=h + ":" + m + ":" + s + " WIB";
  }
setInterval(time, 1000)

const baseUrl = "https://api.banghasan.com/sholat/format/json/";
const getNamaKota = `${baseUrl}kota/kode/695`;
const getJadwalSolat = `${baseUrl}jadwal/kota/695/tanggal/${addZero(date.getFullYear())+'-'+addZero(date.getMonth())+1+'-'+addZero(date.getDate())}`;

fetch(getJadwalSolat) 
.then(res => res.json())
.then(data => showJadwalSolat(data))

function showJadwalSolat(data){
    var listJadwalSolat = data.jadwal.data;
    const terbit = listJadwalSolat.terbit;
    const imsak = listJadwalSolat.imsak;
    const subuh = listJadwalSolat.subuh;
    const dhuha = listJadwalSolat.dhuha;
    const dzuhur = listJadwalSolat.dzuhur;
    const ashar = listJadwalSolat.ashar;
    const maghrib = listJadwalSolat.maghrib;
    const isya = listJadwalSolat.isya;

    fetch(getNamaKota) 
        .then(res => res.json())
        .then(kota => showKota(kota))
    
    function showKota(kota){
        document.getElementById('tanggal').textContent=` ${kota.kota[0].nama} | ${listJadwalSolat.tanggal}`;
    }
    
    document.getElementById('jadwal').innerHTML +=`
    <table class="table table-striped table-hover">
        <tr>
            <th width="20">No</th>
            <th>Jadwal Solat</th>
            <th>Waktu Solat</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Imsak</td>
            <td>${imsak} WIB</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Terbit</td>
            <td>${terbit} WIB</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Subuh</td>
            <td>${subuh} WIB</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Dhuha</td>
            <td>${dhuha} WIB</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Dzuhur</td>
            <td>${dzuhur} WIB</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Ashar</td>
            <td>${ashar} WIB</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Magrib</td>
            <td>${maghrib} WIB</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Isya</td>
            <td>${isya} WIB</td>
        </tr>
    </table>`

    function loopingJadwalSolat() {
        var d = new Date();
        var m = addZero(d.getMinutes());
        var h = addZero(d.getHours());
    
        waktu = h + ":" + m;
        switch(waktu){ 
            case subuh:
                console.log('Waktu Solat Subuh Telah Tiba');
                playSound('./source/Adzan_subuh.mp3');
                break;
            case '07:30':
                console.log('Asma\'ul Husna');
                playSound('./source/Asmaul_Husna.mp3');
                break;
            case '07:40':
                console.log('Do\'a Pagi');
                playSound('./source/Doa_goes.mp3');
                break;
            case dzuhur:
                console.log('Waktu Solat Dzuhur Telah tiba');
                playSound('./source/Adzan.mp3');
                break;
            case ashar:
                console.log('Waktu Solat Ashar Telah Tiba');
                playSound('./source/Adzan.mp3');
                break;
            case maghrib:
                console.log('Waktu Solat Maghrib Telah Tiba');
                playSound('./source/Adzan.mp3');
                break;
            case isya:
                console.log('Waktu Solat Isya Telah Tiba');
                playSound('./source/Adzan.mp3');
                break;
        }
      }
    setInterval(loopingJadwalSolat, 60000)


    function playSound(url) {
        var a = new Audio(url);
        a.play();
    }
}




