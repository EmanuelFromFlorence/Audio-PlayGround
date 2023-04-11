import Experience from "../Experience";

export default class HTMLElements {
    // Static counter for canvas id's
    static #countIds = 0;

    // constructor
    constructor() {
        this.experience = new Experience();
        this.options    = this.experience.options;
        this.sizes      = this.experience.sizes;
        this.songs      = this.experience.songs;
        this.song       = this.experience.song;
        
        this.create();

        this.setupAudioControlEvents();
//        this.createAudioControls();
    }

    setupAudioControlEvents() {
        // Time bar its changing by the user
        this.dragTime = false;

        // Audio songs select option element
        this.elementAudioSongs.addEventListener('change', (e) => {
            for (let i = 0; i < this.songs.length; i++) {
                if (e.currentTarget.value === this.songs[i].name) {
                    this.experience.song = this.songs[i];
                    break;
                }
            }
            
            this.experience.audioAnalizer.loadSong(this.experience.song.path);
            this.experience.audioAnalizer.playPause();
            this.experience.world.audioInfo.setup();
        });
        // Audio play / pause button element
        this.elementAudioPlay.addEventListener('click', (e) => { 
            if (this.experience.audioAnalizer.playPause() == false) {
                this.elementAudioPlay.innerHTML = "Play";
            }
            else {
                this.elementAudioPlay.innerHTML = "Pause";
            }
        });
        // Audio volume slider element
        this.elementAudioVolume.addEventListener('input', (e) => { 
            this.experience.audioAnalizer.gainNode.gain.value = e.currentTarget.value;
        }); 
        // Audio time slider element mousedown
        this.elementAudioTime.addEventListener('mousedown', (e) => { 
            this.dragTime = true;
        }); 

        // Audio time slider element touchstart
        this.elementAudioTime.addEventListener('touchstart', (e) => { 
            this.dragTime = true;
        }); 
        // Audio time slider element mouseup
        this.elementAudioTime.addEventListener('mouseup', (e) => { 
            this.dragTime = false;
        }); 
        // Audio time slider element touchend
        this.elementAudioTime.addEventListener('touchend', (e) => { 
            this.dragTime = false;
        }); 

        this.elementAudioTime.addEventListener('change', (e) => { 
            this.experience.audioAnalizer.song.currentTime = this.elementAudioTime.value;
        }); 

    }

    createAudioControls() {
        let audioControls = "<div class='Experience_AudioControls Experience_Panel'>";
        audioControls +=    "</div>";
        document.body.innerHTML = document.body.innerHTML + audioControls;

        // Obtengo la etiqueta del marco para los controles
        this.elementAudioControls = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls");

    }

    create() {
        // Si no hay una ID asignada es que no se ha creado la etiqueta OCanvas para este objeto
        if (typeof(this.id) === 'undefined') {
            // Creo las etiquetas necesarias para el canvas, los botones, el framerate y la carga
            const preElementExperience = document.createElement("div");
            // Asigno la id para este Canvas, y sumo 1 al contador de ids estatico
            this.id = HTMLElements.#countIds ++;
            preElementExperience.id        = "Experience" + this.id; 
            preElementExperience.className = "Experience";
            // Añado la etiqueta que contiene todas las etiquetas de este OCanvas
            this.options.rootElement.appendChild(preElementExperience);
            this.elementExperience = document.getElementById(preElementExperience.id);
            // Setup the loading atribute
            this.elementExperience.setAttribute("loading", true);
            // Creo un string para crear las etiquetas HTML
            let strHTML = ""
            // Añado la etiqueta para el canvas
            strHTML += '<canvas id="Experience' + this.id + '_Canvas" class="Experience_Canvas"></canvas>';
            // Añado la etiqueta para el marco que indica que se está cargando
            strHTML += '<div class="Experience_Loading Experience_Panel"><span>Loading...</span></div>';
            // Añado la etiqueta para el marco de los controles
            strHTML += '<div class="Experience_Controls">';
            // Show FPS
            if (this.options.showFPS === true) {
                strHTML +=  "<div class='Experience_Panel Experience_Control' title='Frames Per Second'>" +
                                "<div class='Experience_FPS'>60</div>" +
                                "<div class='Experience_TxtFPS'>fps</div>" +
                            "</div>";
            }
            // Show full screen button
            if (this.options.buttonFullScreen === true) {
                strHTML +=  "<div class='Experience_Panel Experience_Control' title='Togle Full Screen'>" +
                            "</div>";
            }
            // Show devildrey33 logo button
            if (this.options.buttonLogo === true) {
                strHTML +=  "<div class='Experience_Panel Experience_Control' title='devildrey33 home page'>" +
                            "</div>";
            }
            // Cierro el div .Experience_Controls
            strHTML += '</div>';

            /* 
             * AudioControls
             */
            strHTML += "<div class='Experience_AudioControls'>";
            strHTML += "<table style='width:300px'><tr><td style='width:70px'>";
            strHTML +=      "<div class='Experience_AC_Play'><button>Play</button></div>";
            strHTML += "</td><td style='width:200px'><table><tr><td><span>song</span></td><td>";
            strHTML +=      "<div class='Experience_AC_Songs'><select name='songs'>";
            for (let i = 0; i < this.songs.length; i++) {
                strHTML += (this.songs[i].name === this.song.name) ? "<option selected>" : "<option>";
                strHTML += this.songs[i].name + "</option>";
            }
            strHTML +=      "</select></div></td></tr><tr><td>volume</td><td>";
            strHTML +=      "<div class='Experience_AC_Volume'><input type='range' name='volume' min='0' max='2' value='1' step='0.01' ></input></div>" ;
            strHTML +=      "</td></tr></table></td>";
//            strHTML +=      "<td><div class='Experience_AC_Info'>txt</div></td>";
            strHTML +=      "</tr></table>";
            strHTML +=      "<div class='Experience_AC_Time'><input type='range'></input></div>" ;
            strHTML += "</div>";

            // Añado el string con todas las nuevas etiquetas al DOOM dentro de la etiqueta OCanvas
            this.elementExperience.innerHTML = strHTML;


            // Audio controls element
            this.elementAudioControls = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls");
            // Audio songs select option element
            this.elementAudioSongs = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls  .Experience_AC_Songs select");
            // Audio play button element
            this.elementAudioPlay = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls  .Experience_AC_Play button");
            // Audio volume slider element
            this.elementAudioVolume = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls  .Experience_AC_Volume input");
            // Audio time slider element
            this.elementAudioTime = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls > .Experience_AC_Time > input");
            // Audio time slider element
            this.elementAudioInfo = document.querySelector("#" + this.elementExperience.id + " > .Experience_AudioControls  .Experience_AC_Info");



        
            // Obtengo la etiqueta del canvas 
            this.elementCanvas = document.querySelector("#" + this.elementExperience.id + " > .Experience_Canvas")
            // Obtengo la etiqueta del marco para la carga
            this.elementLoading = document.querySelector("#" + this.elementExperience.id + " > .Experience_Loading")
            // Obtengo la etiqueta del marco para los controles
            this.elementControls = document.querySelector("#" + this.elementExperience.id + " > .Experience_Controls")
            // if FPS are show
            if (this.options.showFPS === true) {
                // Get FPS html element from the doom
                this.elementFPS = document.querySelector("#" + this.elementExperience.id + " > .Experience_Controls > .Experience_Control > .Experience_FPS")
            }
        }

        // Determino el ancho y altura del canvas (fijo o variable)
        if (this.options.width  === "auto") { this.width  = this.options.width;  }
        if (this.options.height === "auto") { this.height = this.options.height; }        
        // Si el canvas es de ancho fijo, añado el css para centrar-lo
        if (this.options.width  !== "auto") { 
            this.sizes.width = this.options.width;
            this.elementCanvas.style.width  = this.sizes.width  + "px"; 
        }
        if (this.options.left  === "auto") { 
            this.elementCanvas.style.left   = "calc(50% - (" + this.width  + "px / 2))"; 
        }

        if (this.options.height !== "auto") { 
            this.sizes.height = this.options.height;
            this.elementCanvas.style.height = this.height + "px"; 
        }
        if (this.options.top  === "auto") { 
            this.elementCanvas.style.top    = "calc(50% - (" + this.height + "px / 2))"; 
        }

        // Actualizo las posiciones
//        this.eventResize();
    }
}