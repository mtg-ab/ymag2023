// Use import to call it : import Drawers from '../_utils/drawers';
export default class Drawers {
    /**
     * Creates a Drawers instance.
     * @param {NodeList} drawers - The list of drawer elements.
     * @param {NodeList} drawerContents - The list of content elements corresponding to the drawers.
     * @param {object} options - Additional options for configuring the Drawers behavior (optional).
     * - oneCanBeOpen: boolean - Whether or not only one drawer can be open at a time (default: false, optional).
     * - activeDrawer: number - The index of the initially active drawer (default: -1, optional).
     * 
     * @example
     * import Drawers from '../_utils/drawers';
     * const drawers = new Drawers(document.querySelectorAll('.drawer'),
     *  document.querySelectorAll('.drawer-content'),
     *  { oneCanBeOpen: true, activeDrawer: 0});
     * 
     * */
    constructor(drawers, drawerContents, options = { activeDrawer: -1, oneCanBeOpen: false }) {
        this.drawers = drawers;
        this.drawerContents = drawerContents;
        this.activeDrawer = options.activeDrawer === undefined ? -1 : options.activeDrawer;
        // If the active drawer is greater than the number of drawers, set it to -1.
        if ((!this.activeDrawer || this.activeDrawer != -1) && this.activeDrawer > drawers.length - 1) {
            this.activeDrawer = -1;
        }
        this.oneCanBeOpen = options.oneCanBeOpen || false;
        this._init();
    }
    /**
     * Calculates the height of the drawer content at the specified index.
     * */
    calculateDrawerContentHeight() {
        for (let i = 0; i < this.drawers.length; i++) {
            this.drawerContents[i].style.height = "auto";
            this.drawerContents[i].setAttribute("data-height", this.drawerContents[i].offsetHeight);
            if (this.activeDrawer !== -1 && this.activeDrawer !== i) {
                this.drawerContents[i].style.height = "0px";
            }
        }
    }
    /**
     * Opens the drawer at the specified index.
     * 
     * @param {number} index - The index of the drawer to open.
     * */
    openDrawer(index) {
        this.drawers[index].classList.add('open');
        this.drawerContents[index].style.height = this.drawerContents[index].getAttribute("data-height") + "px";
        this.activeDrawer = index;
    }
    /**
     * Closes the drawer at the specified index.
     * 
     * @param {number} index - The index of the drawer to close.
     * */
    closeDrawer(index) {
        this.drawers[index].classList.remove('open');
        this.drawerContents[index].style.height = "0px";
        if (this.oneCanBeOpen) this.activeDrawer = -1;
    }
    /**
     * Closes all drawers.
     * */
    closeAllDrawers() {
        for (let i = 0; i < this.drawers.length; i++) {
            this.closeDrawer(i);
        }
        this.activeDrawer = -1;
    }
    /**
     * Initializes the Drawers instance.
     * @private
     * */
    _init() {
        const self = this;
        this.calculateDrawerContentHeight();
        for (let i = 0; i < this.drawers.length; i++) {
            this.drawers[i].classList.remove('open');
            this.drawerContents[i].style.height = "0px";
        }
        if (this.activeDrawer != -1) {
            this.openDrawer(this.activeDrawer);
        }
        for (let i = 0; i < this.drawers.length; i++) {
            this.drawers[i].addEventListener("click", function () {
                if (this.classList.contains('open')) {
                    self.closeDrawer(i);
                } else {
                    if (self.oneCanBeOpen) {
                        self.closeAllDrawers();
                    }
                    self.openDrawer(i);
                }
            });
        }
        window.addEventListener("resize", function () {
            self.calculateDrawerContentHeight();
            for (let i = 0; i < self.drawers.length; i++) {
                self.drawers[i].classList.remove('open');
                self.drawerContents[i].style.height = "0px";
            }
            if (self.activeDrawer != -1) {
                self.openDrawer(self.activeDrawer);
            }
        });
    }
}
