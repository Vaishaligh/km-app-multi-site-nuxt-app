export default class GoogleAnalytics {

    constructor(trackerType, env, trackingID) {

        this.tracker = trackerType;
        this.env = env || "prod";
        this.trackingID = trackingID;

        if (this.tracker === 'gtag' && this.env === 'prod') {
            try{
                gtag('config', this.trackingID);
            }
            catch (e) {
                console.log(e);
            }
        }

    }

    recordQuery(q) {

        let url = `/search?q=${q}`;

        if (this.env === 'prod') {
            try {
                switch (this.tracker) {

                    case 'ga': {
                        ga('set', 'page', url);
                        ga('send', 'pageview');
                    }
                        break;

                    case 'gtag': {
                        gtag('config', this.trackingID, {'page_path': url});
                    }
                        break;
                    case 'gtm': {
                        window.dataLayer.push({
                            'event': 'st virtualPageView',
                        })
                    }
                        break;


                    default : {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Query Recorded: ${url}`);
        }
    }

    recordSearchStartEvent(action) {

        if (this.env === 'prod') {
            try{
                switch (this.tracker) {

                    case 'ga': {
                        ga('send', 'event', 'Search Initiated', action, 'Search Initiated');
                    }
                        break;

                    case 'gtag': {
                        gtag('event', 'Search Initiated', {
                            'event_category': 'SearchTap',
                            'event_label': 'Search Initiated',
                            'event_action': action
                        });
                    }
                        break;

                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Search Start Recorded`);
        }
    }

    recordProductViewedEvent(itemName) {

        if (this.env === 'prod') {
            try{
                switch(this.tracker) {

                    case 'ga': {
                        ga('send', 'event', 'Product Viewed via SearchTap', 'click', itemName);
                    }
                        break;

                    case 'gtag': {
                        gtag('event', 'Product Viewed via SearchTap', {
                            'event_category': 'Product Viewed via SearchTap',
                            'event_label': itemName,
                            'event_action': 'click'
                        });
                    }
                        break;
                    case 'gtm': {
                        window.dataLayer.push({
                            'event': 'st productView',
                            'st_viewedItem': itemName
                        })
                    }
                        break;

                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Product Viewed: ${itemName}`);
        }
    }

    recordFilterEvent(pos, filter) {

        if (this.env === 'prod') {
            try {
                switch (this.tracker) {

                    case 'ga': {
                        if (pos.toLowerCase() === 'top') {
                            ga('send', 'event', 'SearchTap Filters', 'Bubble Filters Selected', filter);
                        } else if (pos.toLowerCase() === 'left') {
                            ga('send', 'event', 'SearchTap Filters', 'Navigation Filters Selected', filter);
                        }
                    }
                        break;

                    case 'gtag': {

                        if (pos.toLowerCase() === 'top') {

                            gtag('event', 'SearchTap Filters', {
                                'event_category': 'Bubble Filters Selected',
                                'event_label': filter,
                                'event_action': 'click'
                            });
                        } else if (pos.toLowerCase() === 'left') {

                            gtag('event', 'SearchTap Filters', {
                                'event_category': 'Navigation Filters Selected',
                                'event_label': filter,
                                'event_action': 'click'
                            });
                        }
                    }
                        break;
                    case 'gtm': {
                        if (pos === 'top') {
                            window.dataLayer.push({
                                'event': 'st filter',
                                'st_filter variable': `Bubble Filters Selected: ${filter}`
                            })
                        } else if (pos === 'left') {
                            window.dataLayer.push({
                                'event': 'st filter',
                                'st_filter variable': `Left Filters Selected: ${filter}`
                            })
                        }
                    }
                        break;

                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch(e){
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} &  ${pos} Filter Recorded: ${filter}`);
        }
    }

    recordSortEvent(sortName) {

        if (this.env === 'prod') {
            try{
                switch(this.tracker) {

                    case 'ga': {
                        ga('send', 'event', 'SearchTap Sort', 'select', sortName);
                    }
                        break;

                    case 'gtag': {
                        gtag('event', 'SearchTap Sort', {
                            'event_category': 'SearchTap Sort',
                            'event_label': sortName,
                            'event_action': 'select'
                        });
                    }
                        break;
                    case 'gtm': {
                        window.dataLayer.push({
                            'event': 'st sort',
                            'st_sort': `Sort Selected: ${sortName}`
                        })
                    }
                        break;

                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch(e){
                console.log(e);
            }

        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Sort Recorded: ${sortName}`);
        }
    }

    recordGenderEvent(gender) {

        if (this.env === 'prod') {
            try{
                switch(this.tracker) {

                    case 'ga': {
                        ga('send', 'event', 'SearchTap Gender Filter', 'select', gender);
                    }
                        break;

                    case 'gtag': {
                        gtag('event', 'SearchTap Gender Filter', {
                            'event_category': 'SearchTap Gender Filter',
                            'event_label': gender,
                            'event_action': 'select'
                        });
                    }
                        break;
                    case 'gtm': {
                        window.dataLayer.push({
                            'event': 'st gender',
                            'st_gender': gender
                        })
                    }
                        break;


                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Gender Recorded: ${gender}`);
        }
    }

    recordCartEvent(itemName) {

        if (this.env === 'prod') {
            try{
                switch(this.tracker) {

                    case 'ga': {
                        ga('send', 'event', 'Product Added in the Cart via SearchTap', 'click', itemName);
                    }
                        break;

                    case 'gtag': {
                        gtag('event', 'Product Added in the Cart via SearchTap', {
                            'event_category': 'Product Added in the Cart via SearchTap',
                            'event_label': itemName,
                            'event_action': 'click'
                        });
                    }
                        break;
                    case 'gtm': {
                        window.dataLayer.push({
                            'event': 'st add to cart',
                            'add_cart': `Product Added in the Cart via SearchTap: ${itemName}`
                        })
                    }
                        break;


                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Add to Cart Event Recorded for: ${itemName}`);
        }
    }

    recordWishListEvent(itemName) {

        if (this.env === 'prod') {
            try{
                switch(this.tracker) {

                    case 'ga': {
                        ga('send', 'event', 'Product Added to the WishList', 'click', itemName);
                    }
                        break;

                    case 'gtag': {
                        gtag('event', 'Product Added to the WishList', {
                            'event_category': 'Product Added to the WishList',
                            'event_label': itemName,
                            'event_action': 'click'
                        });
                    }
                        break;
                    case 'gtm': {
                        window.dataLayer.push({
                            'event': 'st wishlist',
                            'st_cartItem': itemName
                        })
                    }
                        break;

                    default: {
                        console.log(`Invalid Tracker`);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (this.env === 'dev') {
            console.log(`Tracker Type: ${this.tracker} & Add to WishList Event Recorded for: ${itemName}`);
        }
    }

};
