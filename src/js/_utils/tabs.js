// Use import to call it : import Tabs from '../_utils/tabs';
export default class Tabs {
    /**
     * Creates a Tabs instance.
     * @param {NodeList} tabs - The list of tab elements.
     * @param {NodeList} tabContents - The list of content elements corresponding to the tabs.
     * @param {number} activeTab - The index of the initially active tab (default: 0, optional).
     * @param {object} options - Additional options for configuring the Tabs behavior (optional).
     * 
     * @example
     * import Tabs from '../_utils/tabs';
     * const tabs = new Tabs(
     *    document.querySelectorAll('.wrapper-tabs-top li p'),
     *   document.querySelectorAll('.wrapper-tabs-content .tab'),
     *  0, { hover: true});
     * 
     * */
    constructor(tabs, tabContents, activeTab = 0, options = { hover: false}) {
        this.tabs = tabs;
        this.tabContents = tabContents;
        this.contentDisplay = this.tabContents[0].style.display;
        this.activeTab = activeTab || 0;
        if (activeTab > tabs.length - 1) {
            this.activeTab = 0;
        }
        this.hover = options.hover || false;
        this.removeAllActiveClass();
        this.setActiveTab(this.activeTab);
        this._init();
    }
    /**
     * Removes the active class from all tabs and tab contents.
     * @private
     * */
    removeAllActiveClass() {
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].classList.remove('active');
            this.tabContents[i].classList.remove('active');
            this.tabContents[i].style.display = "none";
        }
    }
    /**
     * Removes the active class from the tab and tab content at the specified index.
     * 
     * @param {number} index - The index of the tab and tab content to remove the active class from.
     * */
    removeActiveClass(index) {
        this.tabs[index].classList.remove('active');
        this.tabContents[index].classList.remove('active');
        this.tabContents[index].style.display = "none";
    }
    /**
     * Sets the active class on the tab and tab content at the specified index.
     * 
     * @param {number} index - The index of the tab and tab content to set the active class on.
     * */
    setActiveTab(index) {
        const self = this;
        this.removeActiveClass(this.activeTab);
        this.activeTab = index;
        this.tabContents[index].style.display = this.contentDisplay;
        setTimeout(function () {
            self.tabs[index].classList.add('active');
            self.tabContents[index].classList.add('active');
        }, 10);
    }
    /**
     * Initializes the Tabs instance.
     * */
    _init() {
        const type = this.hover ? 'mouseenter' : 'click';
        for(let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].addEventListener(type, e => {
                e.preventDefault();
                this.removeActiveClass(this.activeTab);
                this.setActiveTab(i);
            });
        }
    }
}
