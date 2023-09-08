// Use import to call it : import Videos from '../_utils/videos';
export default class Videos {
    /**
     * Creates a Videos instance.
     * @param {NodeList} videoContainer - The list of video elements.
     * @param {string} type - The type of video (youtube, vimeo, html5).
     * @param {object} options - Additional options for configuring the Videos behavior (optional).
     * - playerButton: boolean - Whether to display the play button (optional).
     * - loop: boolean - Whether to loop the video (optional).
     * - muted: boolean - Whether to mute the video (optional).
     * - autoplay: boolean - Whether to autoplay the video (optional).
     * - controls: boolean - Whether to display the controls (optional).
     * @example
     * import Videos from '../_utils/videos';
     * const videos = new Videos(
     *   document.querySelectorAll('.video-module'),
     *  { playerButton: true, poster: true, loop: false, muted: true, autoplay: false, controls: true });
     * 
     * 
    * */
    constructor(videoContainer, options = { playerButton: true, poster: true, loop: false, muted: true, autoplay: false, controls: true }) {
        this.videoContainer = videoContainer;
        this.poster = videoContainer.getElementsByClassName("poster")[0];
        this.type = videoContainer.getAttribute('data-type');
        this.options = {
            playerButton: options.playerButton || true,
            poster: options.poster || true,
            loop: options.loop || false,
            muted: options.muted || true,
            autoplay: options.autoplay || false,
            controls: options.controls || true
        };
        if (this.type == 'youtube') {
            this.video = videoContainer.getElementsByTagName("iframe")[0];
            this.link = this.video.getAttribute('data-src');
            this._youtubeUrlCleaner(this.link);
        } else {
            this.video = videoContainer.getElementsByTagName("video")[0];
            this._handleOptions();
        }
        this._init();
    }

    playVideo() {
        if (this.type == 'youtube') {
            this.video.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}', "*"
            );
        } else {
            this.video.play();
        }
        this.videoContainer.classList.add('playing');
    }

    pauseVideo() {
        if (this.type === 'youtube') {
            this.video.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}', "*"
            );
        } else {
            this.video.pause();
        }
    }

    _handleOptions() {
        let linkOptions = "";
        if (this.type == 'youtube') {
            linkOptions = "?showinfo=0&rel=0";
            if (this.options.autoplay) {
                linkOptions += "&autoplay=1";
                this.video.setAttribute("autoplay", "true");
            }
            if (this.options.loop) {
                linkOptions += "&loop=1";
                this.video.setAttribute("loop", "true");
            }
            if (this.options.muted) {
                linkOptions += "&mute=1";
                this.video.setAttribute("muted", "true");
            }
            if (this.options.controls) {
                linkOptions += "&controls=1";
                this.video.setAttribute("controls", "true");
            }
            this.video.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
            this.video.setAttribute("allowfullscreen", "");
        } else if (this.type == 'file') {
            if (this.options.autoplay) {
                this.video.setAttribute("autoplay", "true");
            }
            if (this.options.loop) {
                this.video.setAttribute("loop", "true");
            }
            if (this.options.muted) {
                this.video.setAttribute("muted", "true");
            }
            if (this.options.controls) {
                this.video.setAttribute("controls", "true");
            }
        }
        return linkOptions;
    }

    _youtubeUrlCleaner(url) {
        const srcString = url.toString();
        const opt = this._handleOptions();
        if (srcString.includes("=")) {
            let srcSplit = srcString.split("watch?v=");
            let cleanedUrl = "https://www.youtube.com/embed/" + srcSplit[1] + opt + "&playlist=" + srcSplit[1];
            this.video.setAttribute("src", cleanedUrl);
        } else {
            let srcSplit = srcString.split("embed/");
            let cleanedUrl = srcString + opt + "&playlist=" + srcSplit[1];
            this.video.setAttribute("src", cleanedUrl);
        }
    };

    _setPlayerButton() {
        let playButton = document.createElement('div');
        playButton.classList.add('btn-player');
        this.videoContainer.appendChild(playButton);
    }

    _init() {
        if (this.options.playerButton) {
            this._setPlayerButton();
        }
        if (!this.options.poster) {
            this.poster.remove();
        }
        this.videoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            this.playVideo();
        });
    }
}

/*
///// HTML //////
<div class="video video-{{module.video.video_type}}" data-type="{{module.video.video_type}}">
                    <figure class="poster" role="none">
                        <img src="{{module.video.poster.src}}" alt="{{module.video.poster.alt}}"
                            width="{{module.video.poster.width}}" height="{{module.video.poster.height}}">
                    </figure>
                    {% if module.video.video_type == "hsvideo" %}
                    {% video_player "embed_player" overrideable=False, type='scriptV4', hide_playlist=True,
                    viral_sharing=False,
                    embed_button=False, autoplay=True, hidden_controls=True, loop=True, muted=False, full_width=False,
                    width='540', height='400', player_id='{{module.video.video_file.player_id}}' %}
                    {% elif module.video.video_type == "file" %}
                    <video width="650" height="430">
                        <source src="{{module.video.file}}" />
                    </video>
                    {% else %}
                    <iframe width="100%" height="100%" data-src="{{ module.video.video_youtube }}" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                    {% endif %}
                </div>

/////// CSS //////
.video {
                aspect-ratio: 540 / 400;
                pointer-events: all;
                width: 100%;
                height: 100%;
                cursor: pointer;
                iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    
                }
                video{
                    position: absolute;
                    background-color: black;
                    border-radius: 10px;
                    top: 50%;
                    left: 50%;
                    aspect-ratio: 540/400;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                }
                .poster {
                    pointer-events: none;
                    position: absolute;
                    border-radius: 10px;
                    top: -2px;
                    left: -2px;
                    width: calc(100% + 4px);
                    height: calc(100% + 4px);
                    cursor: pointer;
                    z-index: 3;
                    transition: opacity 0.3s ease-in-out;
                    img {
                        width: 100%;
                        pointer-events: none;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .btn-player {
                    width: 80px;
                    height: 80px;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' rx='40' fill='%23282844'/%3E%3Cpath d='M55.3848 39.6154L32.8848 52.6057L32.8848 26.625L55.3848 39.6154Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A");
                    background-position: 50%;
                    background-repeat: no-repeat;
                    background-size: contain;
                    position: absolute;
                    z-index: 5;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.3s ease-in-out;
                }
                &.playing {
                    .poster,.btn-player {
                        opacity: 0;
                        pointer-events: none;
                    }
                    iframe{
                        pointer-events: all;
                    }
                }
            }

///// FIELD.JSON //////

{
        "name": "video",
        "label": "Video",
        "required": false,
        "locked": false,
        "children": [
            {
                "name": "poster",
                "label": "Poster Image",
                "required": false,
                "locked": false,
                "inline_help_text": "",
                "help_text": "",
                "responsive": true,
                "resizable": true,
                "show_loading": false,
                "type": "image",
                "default": {
                    "size_type": "auto",
                    "src": "https://via.placeholder.com/540x400",
                    "alt": "placeholder",
                    "loading": "lazy"
                }
            },
            {
                "id": "video_type",
                "name": "video_type",
                "label": "Video Type",
                "required": false,
                "locked": false,
                "display": "select",
                "inline_help_text": "",
                "help_text": "",
                "choices": [
                    [
                        "hsfile",
                        "Hubspot Direct Video"
                    ],
                    [
                        "file",
                        "Link to Video File"
                    ],
                    [
                        "youtube",
                        "Youtube"
                    ]
                ],
                "type": "choice",
                "placeholder": "",
                "default": "file"
            },
            {
                "id": "",
                "name": "video_file",
                "label": "Video File",
                "required": false,
                "locked": false,
                "type": "videoplayer",
                "visibility": {
                    "controlling_field": "video_type",
                    "controlling_value_regex": "hsfile",
                    "operator": "EQUAL"
                },
                "show_advanced_options": false
            },
            {
                "picker": "file",
                "name": "file",
                "label": "File",
                "required": false,
                "inline_help_text": "",
                "help_text": "",
                "locked": false,
                "type": "file",
                "visibility": {
                    "controlling_field": "video_type",
                    "controlling_value_regex": "file",
                    "operator": "EQUAL"
                },
                "default": null
            },
            {
                "name": "video_youtube",
                "label": "Video Youtube",
                "required": false,
                "locked": false,
                "validation_regex": "",
                "allow_new_line": false,
                "show_emoji_picker": false,
                "type": "text",
                "default": "https://www.youtube.com/embed/NpEaa2P7qZI",
                "visibility": {
                    "controlling_field": "video_type",
                    "controlling_value_regex": "youtube",
                    "operator": "EQUAL"
                }
            }
        ],
        "type": "group",
        "inline_help_text": "",
        "help_text": "",
        "default": {}
    }

*/
