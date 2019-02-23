var app = {
    track: [{
            id: 1,
            title: "Settle Down",
            author: "Ayrosh",
            src: 'file:///android_asset/www/media/Ayrosh-Settle-Down.mp3',
            imgSrc: 'img/bass-guitar-musician-instrument-guitarist-159260.jpeg',

    },
        {
            id: 2,
            title: "One day",
            author: "Blacktone",
            src: 'file:///android_asset/www/media/Blacktone-One-day.mp3',
            imgSrc: 'img/pexels-photo-838685.jpeg',

    },
        {
            id: 3,
            title: "Moyo wangu",
            author: "Kelechi Africana",
            src: 'file:///android_asset/www/media/Kelechi-Africana-Kelechi-Africana-Moyo-wangu.mp3',
            imgSrc: 'img/pexels-photo-977971.jpeg',

    },
        {
            id: 4,
            title: "Never let you go",
            author: "Phd",
            src: 'file:///android_asset/www/media/PHD-NEVER-LET-YOU-GO.mp3',
            imgSrc: 'img/pexels-photo-1065023.jpeg',

    }],
    volume: 0.5,
    media: null,
    status: {
        '0': 'MEDIA_NONE',
        '1': 'MEDIA_STARTING',
        '2': 'MEDIA_RUNNING',
        '3': 'MEDIA_PAUSED',
        '4': 'MEDIA_STOPPED'
    },
    err: {
        '1': 'MEDIA_ERR_ABORTED',
        '2': 'MEDIA_ERR_NETWORK',
        '3': 'MEDIA_ERR_DECODE',
        '4': 'MEDIA_ERR_NONE_SUPPORTED'
    },

    init: function () {
        if (window.hasOwnProperty("cordova")) {
            document.addEventListener("deviceready", app.ready, false);
        } else {
            document.addEventListener("DOMContentLoaded", app.ready);
        }
    },


    ready: function () {
        app.x();
        app.addListeners();

    },

    x: function () {
        let liArray = document.querySelectorAll(".music-item");

        liArray.forEach(function (item) {
            item.addEventListener("click", app.y);
        });

    },


    y: function (ev) {
        let thEv = ev.currentTarget;
        let evId = thEv.getAttribute("data-id");


        let currentTrack = app.track.filter(track => {
                if (track.id == evId) {
                    return true;
                }
            });
        
        let item = currentTrack[0];
        let src = item.src;
        let id = item.id;
        
        localStorage.setItem("id", JSON.stringify(id));

        let outputDiv = document.getElementById("outPutItem");
        outputDiv.innerHTML = "";
        let img = document.createElement("img");
        let imgDiv = document.createElement("div");
        let menuDiv = document.createElement("div");
        let h1Author = document.createElement("h1");
        let h2Title = document.createElement("h2");



        img.src = item.imgSrc;
        img.className = "imgModal"
        h1Author.textContent = item.author;
        h2Title.textContent = item.title;

        outputDiv.appendChild(menuDiv);
        outputDiv.appendChild(imgDiv);
        imgDiv.appendChild(img);
        outputDiv.appendChild(h1Author);
        outputDiv.appendChild(h2Title);



        if (app.media) {
            app.media.stop();
            app.media.release();
            app.media = null;
        }
        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);

        app.showModal();
        app.footerModal();
        
    },

    ftw: function () {

                
        console.log('success doing something');
    },
    wtf: function (err) {
        console.warn('failure');
        console.error(err);
    },
    statusChange: function (status) {
        
         let id = JSON.parse(localStorage.getItem("id"));
        id = (id + 1);
        console.log(id);
        
        
    if (status === Media.MEDIA_STOPPED) {
        
     let nextInTrack = app.track.filter(track => {
                if (track.id == id) {
                    return true;
                }
            });
        
        let item = nextInTrack[0];
        let src = item.src;
        
        if (app.media) {
            app.media.stop();
            app.media.release();
            app.media = null;
        }
        if (id <= app.track.length){
            app.media = new Media(src, app.statusChange);
		    app.media.play();
            
            
            let outputDiv = document.getElementById("outPutItem");
        outputDiv.innerHTML = "";
        let img = document.createElement("img");
        let imgDiv = document.createElement("div");
        let menuDiv = document.createElement("div");
        let h1Author = document.createElement("h1");
        let h2Title = document.createElement("h2");



        img.src = item.imgSrc;
        img.className = "imgModal"
        h1Author.textContent = item.author;
        h2Title.textContent = item.title;

        outputDiv.appendChild(menuDiv);
        outputDiv.appendChild(imgDiv);
        imgDiv.appendChild(img);
        outputDiv.appendChild(h1Author);
        outputDiv.appendChild(h2Title);
            
            
             app.showModal();
        app.footerModal();



        }
        
    }
    

        console.log('media status is now ' + app.status[status]);
    },
    addListeners: function () {
     
        document.getElementById("backBtn").addEventListener("click", function () {
            app.removeModal();
            app.removeFooter();
        });
        document.querySelector('#play-btn').addEventListener('click', app.play);
        document.querySelector('#pause-btn').addEventListener('click', app.pause);
        document.querySelector('#up-btn').addEventListener('click', app.volumeUp);
        document.querySelector('#down-btn').addEventListener('click', app.volumeDown);
        document.querySelector('#btn-fast').addEventListener('click', app.ff);
        document.querySelector('#rew-btn').addEventListener('click', app.rew);
        document.addEventListener('pause', () => {
            app.media.release();
        });
        document.addEventListener('menubutton', () => {
            console.log('clicked the menu button');
        });
        document.addEventListener('resume', () => {
            app.media = new Media(src, app.ftw, app.wtf, app.statusChang);
        });
        
    },
    play: function () {
        app.media.play();
    },
    pause: function () {
        app.media.pause();
    },
    stop: function () {
        app.media.stop();
    },
    volumeUp: function () {
        vol = parseFloat(app.volume);
        console.log('current volume', vol);
        vol += 0.1;
        if (vol > 1) {
            vol = 1.0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.volume = vol;
    },
    volumeDown: function () {
        vol = app.volume;
        console.log('current volume', vol);
        vol -= 0.1;
        if (vol < 0) {
            vol = 0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.volume = vol;
    },
    ff: function () {
        app.media.getCurrentPosition((pos) => {
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            pos += 10;
            if (pos < dur) {
                app.media.seekTo(pos * 1000);
            }
        });
    },
    rew: function () {
        app.media.getCurrentPosition((pos) => {
            pos -= 10;
            if (pos > 0) {
                app.media.seekTo(pos * 1000);
            } else {
                app.media.seekTo(0);
            }
        });
    },


    showModal: function () {
        let modal = document.querySelector(".modal");
        modal.classList.remove("off");
        modal.classList.add("on");

    },

    removeModal: function () {
        let modal = document.querySelector(".modal");
        modal.classList.remove("on");
        modal.classList.add("off");

    },

    footerModal: function () {

        let footer = document.querySelector("#footerid");
        footer.classList.remove("footer");
        footer.classList.add("bigFooter");

    },

    removeFooter: function () {

        let footer = document.querySelector("#footerid");
        footer.classList.remove("bigFooter");
        footer.classList.add("footer");

    },

};

app.init();
