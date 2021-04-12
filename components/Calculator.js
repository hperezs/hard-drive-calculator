import { useEffect, useState } from 'react'
import Image from 'next/image'
import Tooltip from './Tooltip'
import { products, updateRecommendedHardDrives, calculateFormatQualityActivity } from '../lib/helper'


export default function Calculator() {
    const [numberOfCameras, setNumberOfCameras] = useState(1);
    const [daysOfStorage, setDaysOfStorage] = useState(1);
    const [recordingType, setRecordingType] = useState("continuous");
    const [videoFormat, setVideoFormat] = useState("h265");
    const [resolution, setResolution] = useState(5038848);
    const [videoQuality, setVideoQuality] = useState("medium");
    const [sceneActivity, setSceneActivity] = useState("medium");
    const [fps, setFps] = useState(20);
    const [formatQualityActivity, setFormatQualityActivity] = useState(0);
    const [requiredStorage, setRequiredStorage] = useState('---');
    const [recommendedHD, setRecommendedHD] = useState(products.TB1)
    const [isRecommendedHDSingle, setIsRecommendedHDSingle] = useState(true);
    const [additionalHD, setAdditionalHD] = useState(products.TB1);
    const [isRecommendedVisible, setIsRecommendedVisible] = useState(true);
    const [recommendedHDMultiplier, setRecommendedHDMultiplier] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 550px)').matches)
   }, [])

    const KILOBYTE = 1000;

    // Calculate formatQualityActivity whenever values change
    useEffect(() => {
        setFormatQualityActivity(calculateFormatQualityActivity(videoFormat, videoQuality, sceneActivity))
    }, [videoFormat, videoQuality, sceneActivity])

    // Calculate requiredStorage
    useEffect(() => {
        let colorPixelSize = (resolution < 824400 ? 16 : 30)
        let requiredBandwith = resolution * colorPixelSize * fps * numberOfCameras / formatQualityActivity;
        let bytesTotal = requiredBandwith / 8 * 86400 * daysOfStorage;

        if (recordingType == 'motion') {
            bytesTotal = bytesTotal * 0.55;
        }

        let terabytes = (bytesTotal / (KILOBYTE * KILOBYTE * KILOBYTE * KILOBYTE)).toFixed(3);

        setRequiredStorage(terabytes);
    }, [formatQualityActivity, resolution, numberOfCameras, fps, daysOfStorage, recordingType])

    // Change recommended product when requiredStorage changes
    useEffect(() => {
        updateRecommendedHardDrives(requiredStorage, setRecommendedHD, setIsRecommendedHDSingle, setRecommendedHDMultiplier, setAdditionalHD)
    }, [requiredStorage])

    const input_styles = "ml-2 mt-1 shadow-sm cursor-pointer focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm"; 
    const productCard_styles = "border border-purple-700 rounded bg-white flex flex-col justify-center items-center absolute hover:shadow-lg hover:border-purple-500 ";
    const doubleProductCard_styles ="border border-purple-700 rounded bg-white flex flex-col justify-center items-center hover:shadow-lg hover:border-purple-500"

    const numberOfCameras_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 24, 32, 48, 64];
    const daysOfStorage_options = [];
    for(let i = 1; i <= 30; i++) {
        daysOfStorage_options.push(<option key={i}>{i}</option>);
    }

    const fps_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30];

    const handleChanges = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        switch(name) {
            case 'numberOfCameras':
                setNumberOfCameras(value);
                break;
            case 'daysOfStorage':
                setDaysOfStorage(value);
                break;
            case 'recordingType':
                setRecordingType(value);
                break;
            case 'videoFormat': 
                setVideoFormat(value);
                break;
            case 'resolution':
                setResolution(value);
                break;
            case 'videoQuality':
                setVideoQuality(value);
                break;
            case 'sceneActivity':
                setSceneActivity(value);
                break;
            case 'fps':
                setFps(value);
                break;
        }
    }

    return(
        <>
        <div className="w-full flex flex-row justify-center border-0">
            <Image src={`/images/header${isMobile ? '_mobile' : ''}.png`} width={isMobile ? 375 : 900} height={isMobile ? 72 : 105}/>
        </div>
        
        <div className="flex flex-row justify-center ">
            <div className="bg-bg-texture bg-cover pb-10">
                <section className="calculator-content border-0 lg:p-10 sm:text-sm md:text-xl">
                    <div className="flex flex-row justify-center md:justify-between flex-wrap p-5">
                        <div className="inputs-container flex flex-col justify-between lg:pt-16">
                            <div className="flex flex-row justify-between items-center">
                                <label className="text-gray-100">Number of cameras:</label>
                                <div>
                                    <select 
                                    name="numberOfCameras" 
                                    className={input_styles + "w-24"}
                                    value={numberOfCameras}
                                    onChange={handleChanges}
                                    >
                                        {numberOfCameras_options.map(number => {
                                            return(<option key={number}>{number}</option>)
                                        })}
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="numberOfCameras" /></span>
                                </div>
                                
                            </div>

                            <div className=" flex flex-row justify-between items-center">
                                <label className="text-gray-100">Days of storage:</label>
                                <div>
                                    <select 
                                        name="daysOfStorage" 
                                        className={input_styles + "w-24"} 
                                        value={daysOfStorage}
                                        onChange={handleChanges}
                                    >
                                        {daysOfStorage_options}
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="daysOfStorage" /></span>
                                </div>
                                
                            </div>

                            <div className=" flex flex-row justify-between items-center">
                                <label className="text-gray-100">Recording:</label>
                                <div>
                                    <select 
                                        name="recordingType" 
                                        className={input_styles + "w-48"}
                                        onChange={handleChanges}
                                    >
                                        <option value="continuous">Continuous</option>
                                        <option value="motion">Motion Activated</option>
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="recordingType" /></span>
                                </div>
                                
                            </div>

                            {/* <div className=" flex flex-row items-center justify-between">
                                <label className="text-gray-100">Video format:</label>
                                <div>
                                    <select 
                                        name="videoFormat" 
                                        value={videoFormat} 
                                        className={input_styles} 
                                        onChange={handleChanges}
                                    >
                                        <option value="h264">H264</option>
                                        <option value="h265">H265</option>
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="videoFormat" /></span>
                                </div>
                            </div> */}
                            
                            <div className=" flex flex-row items-center justify-between">
                                <label className="text-gray-100">Resolution:</label>
                                <div>
                                    <select name="resolution" className={input_styles} value={resolution} onChange={handleChanges}>
                                        <option value={8294400}>4K (8 Megapixel)</option>
                                        <option value={5038848}>3K (5 Megapixel)</option>
                                        <option value={4085760}>2K (4 Megapixel)</option>
                                        <option value={2073600}>1K (2 Megapixel)</option>
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="resolution" /></span>
                                </div>
                            </div>

                            {/* <div className=" flex flex-row items-center justify-between">
                                <label className="text-gray-100">
                                    Video Quality:
                                </label>
                                <div>
                                    <select 
                                        name="videoQuality" 
                                        value={videoQuality} 
                                        className={input_styles} 
                                        onChange={handleChanges}
                                    >
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="videoQuality" /></span>
                                </div>
                            </div> */}

                            <div className="  flex flex-row items-center justify-between">
                                <label className="text-gray-100">Frames per second (FPS):</label>
                                <div>
                                    <select 
                                        className={input_styles}
                                        name="fps"
                                        value={fps}
                                        onChange={handleChanges}    
                                    >
                                        {fps_options.map(number => {
                                            return(<option key={number}>{number}</option>)
                                        })}
                                    </select>
                                    <span className="inline-block"><Tooltip isMobile={isMobile} inputType="fps" /></span>
                                </div>
                            </div>

                            <p className="text-sm pt-10 pb-5 text-gray-300">*The values provided are an estimate. Actual performance may vary.</p>
                        </div>
                        
                        <div className="recommended-container relative bg-hd-graphic bg-cover bg-center">
                            {/* Required Storage */}
                            <div className="required-storage absolute py-1 bg-cover bg-center">
                                <div className="p-3 text-gray-200">
                                    <h4 className="text-lg mb-1 text-center">Storage Required</h4>
                                    <div className="text-center text-3xl font-bold">{requiredStorage} TB</div>
                                </div>
                            </div>

                            {/* Recommended Product */}
                            <a 
                                href={recommendedHD.link} 
                                target="_blank" 
                                className={productCard_styles + (isRecommendedHDSingle && isRecommendedVisible ? 'p-4 recommended-single' : 'hidden')}
                            >
                                <h5 className="text-lg mb-1 font-light">Recommended Product</h5>
                                <div className="py-2">
                                    <div className="flex justify-center mb-1"><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={100} height={76}/></div>
                                    <div className="text-xl text-center">
                                        {recommendedHD.size} Hard Drive  <span className={"text-green-600 font-normal " + (recommendedHDMultiplier ? '' : 'hidden')}> x{recommendedHDMultiplier}</span>
                                    </div>
                                </div>
                            </a> 
                            
                            {/* For displaying 2 HD's */}
                            <div 
                                className={"absolute " + ((!isRecommendedHDSingle && isRecommendedVisible) ? '' : 'hidden') + (recommendedHDMultiplier ? ' recommended-with-multiplier' : ' recommended-double')}
                            >
                                <div className={"bg-white flex flex-col items-center rounded py-3 px-4"}>
                                    <h5 className="text-lg mb-1 font-light">Recommended Products</h5>
                                    <div className="flex flex-row justify-evenly my-4">
                                        <a href={recommendedHD.link} target="_blank" className={doubleProductCard_styles + "p-2"}>
                                            <div className="p-3">
                                                <div className="flex justify-center mb-1"><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={60} height={47}/></div>
                                                <span className="block text-base font-normal text-center">
                                                    {recommendedHD.size} HDD 
                                                    <div className={"text-purple-600 font-normal " + (recommendedHDMultiplier ? '' : 'hidden')}>x{recommendedHDMultiplier}</div>
                                                </span>
                                            </div>
                                        </a>
                                        <div className="flex flex-col justify-center text-3xl mx-1 text-purple-700">+</div>
                                        <a href={additionalHD.link} target="_blank" className={doubleProductCard_styles + "p-2"}>
                                            <div className="p-3">
                                                <div className="flex justify-center mb-1"><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={60} height={47}/></div>
                                                <span className="block text-base font-normal text-center">
                                                    {additionalHD.size} HDD
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="bs-logo absolute px-16 mt-10 mb-5">
                                <Image src="/images/graylogo.png" width={160} height={42}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}