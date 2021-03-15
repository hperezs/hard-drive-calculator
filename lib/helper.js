const products = {
    TB1: {
        size: '1TB',
        price: '$65.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/1-terabyte-internal-hard-drive.html'
    },

    TB2: {
        size: '2T',
        price: '$99.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/2-terabyte-internal-hard-drive.html'
    },

    TB4: {
        size: '4T',
        price: '$189.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/4-terabyte-internal-hard-drive.html'
    },

    TB8: {
        size: '8T',
        price: '$349.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/8-terabyte-internal-hard-drive.html'
    },

    TB10: {
        size: '10T',
        price: '$449.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/10-terabyte-internal-hard-drive.html'
    }
}

export function updateRecommendedHardDrives(requiredStorage, setRecommendedHD, setIsRecommendedHDSingle, setRecommendedHDMultiplier, setAdditionalHD) {
    if(requiredStorage < 1.000) {
        setRecommendedHD(products.TB1)
        setIsRecommendedHDSingle(true);
        setRecommendedHDMultiplier(0);
    }
    if (requiredStorage > 0.999){
        setRecommendedHD(products.TB2)
        setIsRecommendedHDSingle(true);
        setRecommendedHDMultiplier(0);
    }
    if(requiredStorage > 1.999) {
        setRecommendedHD(products.TB4)
        setIsRecommendedHDSingle(true);
        setRecommendedHDMultiplier(0);
    }
    if(requiredStorage > 3.999) {
        setRecommendedHD(products.TB8)
        setIsRecommendedHDSingle(true);
        setRecommendedHDMultiplier(0);
    }
    if(requiredStorage > 7.999) {
        setRecommendedHD(products.TB10)
        setIsRecommendedHDSingle(true);
        setRecommendedHDMultiplier(0);
    }
    if(requiredStorage > 9.999) {
        setIsRecommendedHDSingle(false);
        setRecommendedHD(products.TB10);
        setAdditionalHD(products.TB1);
    }
    if(requiredStorage > 10.999) {
        setIsRecommendedHDSingle(false);
        setRecommendedHD(products.TB10);
        setAdditionalHD(products.TB2);
    }
    if(requiredStorage > 11.999) {
        setIsRecommendedHDSingle(false);
        setRecommendedHD(products.TB10);
        setAdditionalHD(products.TB4);
    }
    if(requiredStorage > 13.999) {
        setIsRecommendedHDSingle(false);
        setRecommendedHD(products.TB10);
        setAdditionalHD(products.TB8);
    }
    if(requiredStorage > 17.999) {
        setIsRecommendedHDSingle(false);
        setRecommendedHD(products.TB10);
        setAdditionalHD(products.TB10);
    }
    if(requiredStorage > 19.999) {
        setIsRecommendedHDSingle(false);
        
        let multiplier = Math.ceil(requiredStorage / 10) - 1;
        setRecommendedHDMultiplier(multiplier);
        setRecommendedHD(products.TB10);

        let remainder = requiredStorage % 10;

        switch(true) {
            case remainder < 1:
                setAdditionalHD(products.TB1);
                break;
            case remainder < 2: 
                console.log('switch works');
                setAdditionalHD(products.TB2);
                break;
            case remainder < 4:
                setAdditionalHD(products.TB4);
                break;
            case remainder < 8:
                setAdditionalHD(products.TB8);
                break;
            case remainder < 10: 
                setIsRecommendedHDSingle(true);
                setRecommendedHDMultiplier(multiplier + 1);
                break;
        }
    }
}

export function calculateFormatQualityActivity(videoFormat, videoQuality, sceneActivity){
    switch(videoFormat){
        case('h264'):
            switch(videoQuality) {
                case 'high':
                    switch(sceneActivity) {
                        case 'high':
                            return(98);
                            break;
                        case 'medium':
                            return(102);
                            break;
                        case 'low':
                            return(105);
                            break;
                    }
                    break;
                case 'medium':
                    switch(sceneActivity) {
                        case 'high':
                            return(160);
                            break;
                        case 'medium':
                            return(173);
                            break;
                        case 'low':
                            return(181);
                            break;
                    }
                    break;
                case 'low':
                    switch(sceneActivity) {
                        case 'high':
                            return(220);
                            break;
                        case 'medium':
                            return(242);
                            break;
                        case 'low':
                            return(260);
                            break;
                    }
                    break;
            }
            break;
        case('h265'):
            switch(videoQuality) {
                case 'high':
                    switch(sceneActivity) {
                        case 'high':
                            return(260);
                            break;
                        case 'medium':
                            return(272);
                            break;
                        case 'low':
                            return(282);
                            break;
                    }
                    break;
                case 'medium':
                    switch(sceneActivity) {
                        case 'high':
                            return(480);
                            break;
                        case 'medium':
                            return(510);
                            break;
                        case 'low':
                            return(536);
                            break;
                    }
                    break;
                case 'low':
                    switch(sceneActivity) {
                        case 'high':
                            return(620);
                            break;
                        case 'medium':
                            return(670);
                            break;
                        case 'low':
                            return(710);
                            break;
                    }
                    break;
            }
            break;
    }
}