import { useEffect, useState } from 'react'
import Image from 'next/image'
import Tooltip from './Tooltip'
import { updateRecommendedHardDrives, calculateFormatQualityActivity } from '../lib/helper'


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
    const [recommendedHD, setRecommendedHD] = useState({
        size: '1TB',
        price: '$65.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/1-terabyte-internal-hard-drive.html'
    })
    const [isRecommendedHDSingle, setIsRecommendedHDSingle] = useState(true);
    const [additionalHD, setAdditionalHD] = useState({
        size: '1TB',
        price: '$65.00',
        link: 'https://www.backstreet-surveillance.com/cctv-parts/surveillance-hard-drives/1-terabyte-internal-hard-drive.html'
    })
    const [isRecommendedVisible, setIsRecommendedVisible] = useState(true);
    const [recommendedHDMultiplier, setRecommendedHDMultiplier] = useState(0);

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
            bytesTotal = bytesTotal * 0.45;
        }

        let terabytes = (bytesTotal / (KILOBYTE * KILOBYTE * KILOBYTE * KILOBYTE)).toFixed(3);

        setRequiredStorage(terabytes);
    }, [formatQualityActivity, resolution, numberOfCameras, fps, daysOfStorage, recordingType])

    // Change recommended product when requiredStorage changes
    useEffect(() => {
        updateRecommendedHardDrives(requiredStorage, setRecommendedHD, setIsRecommendedHDSingle, setRecommendedHDMultiplier, setAdditionalHD)
    }, [requiredStorage])

    const input_styles = "ml-5 mt-1 border-green-600 shadow-sm cursor-pointer focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 "; 
    const productCard_styles = "border border-green-700 bg-white flex flex-col justify-center items-center hover:shadow-lg hover:border-green-500 ";

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
                console.log(value);
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
        <div className="w-full flex flex-row justify-center">
            <Image src='/images/calculator-header.png' width={900} height={92}/>
        </div>
        
        <div className="flex flex-row justify-center">
            <div className="bg-bg-texture bg-cover">
                <section className="border-2 border-green-600 w-900 p-10 text-xl bg-white bg-opacity-30 ">
                <div className="flex flex-row justify-between ">
                    <div className="width-42 flex flex-col justify-between pt-16">
                        <div className="flex flex-row justify-between items-center">
                            <label>Number of cameras:</label>
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
                                <span className="inline-block"><Tooltip inputType="numberOfCameras" /></span>
                            </div>
                            
                        </div>

                        <div className=" flex flex-row justify-between items-center">
                            <label>Days of storage:</label>
                            <div>
                                <select 
                                    name="daysOfStorage" 
                                    className={input_styles + "w-24"} 
                                    value={daysOfStorage}
                                    onChange={handleChanges}
                                >
                                    {daysOfStorage_options}
                                </select>
                                <span className="inline-block"><Tooltip inputType="daysOfStorage" /></span>
                            </div>
                            
                        </div>

                        <div className=" flex flex-row justify-between items-center">
                            <label>Recording:</label>
                            <div>
                                <select 
                                    name="recordingType" 
                                    className={input_styles + "w-48"}
                                    onChange={handleChanges}
                                >
                                    <option value="continuous">Continuous</option>
                                    <option value="motion">Motion Activated</option>
                                </select>
                                <span className="inline-block"><Tooltip inputType="recordingType" /></span>
                            </div>
                            
                        </div>

                        {/* <div className=" flex flex-row items-center justify-between">
                            <label>Video format:</label>
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
                                <span className="inline-block"><Tooltip inputType="videoFormat" /></span>
                            </div>
                        </div> */}
                        
                        <div className=" flex flex-row items-center justify-between">
                            <label>Resolution:</label>
                            <div>
                                <select name="resolution" className={input_styles} value={resolution} onChange={handleChanges}>
                                    <option value={8294400}>4K (8 Megapixel)</option>
                                    <option value={5038848}>3K (5 Megapixel)</option>
                                    <option value={4085760}>2K (4 Megapixel)</option>
                                    <option value={2073600}>1K (2 Megapixel)</option>
                                </select>
                                <span className="inline-block"><Tooltip inputType="resolution" /></span>
                            </div>
                        </div>

                        {/* <div className=" flex flex-row items-center justify-between">
                            <label>
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
                                <span className="inline-block"><Tooltip inputType="videoQuality" /></span>
                            </div>
                        </div> */}

                        <div className="  flex flex-row items-center justify-between">
                            <span>Frames per second (FPS):</span>
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
                            <span className="inline-block"><Tooltip inputType="fps" /></span>
                        </div>

                        <p className="text-sm pt-10 pb-5">*The values provided are an estimate. Actual performance may vary.</p>
                    </div>
                    
                    <div className="w-6/12 flex flex-col">
                        <div className="p-5 border-2 border-green-700 mt-5 mb-10 bg-white">
                            <h4 className="text-xl mb-3 text-center">Storage Capacity Required</h4>
                            <div className="text-center text-3xl">{requiredStorage} TB</div>
                        </div>
                            
                        <a href={recommendedHD.link} target="_blank" className={productCard_styles + (isRecommendedHDSingle && isRecommendedVisible ? 'p-5 h-350' : 'hidden')}>
                            <h5 className="text-xl mb-3">Recommended Product</h5>
                            <div className="py-5">
                                <div><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={240} height={192}/></div>
                                <div className="text-xl text-center font-light">
                                    {recommendedHD.size} Hard Drive  <span className={"text-green-600 font-normal " + (recommendedHDMultiplier ? '' : 'hidden')}> x{recommendedHDMultiplier}</span>
                                </div>
                            </div>
                        </a> 
                        
                        <div className={"h-350 border border-green-600 bg-white flex flex-col items-center justify-between py-7 px-4 " + (!isRecommendedHDSingle && isRecommendedVisible ? '' : 'hidden')}>
                            <h5 className="text-xl mb-5">Recommended Products</h5>
                            <div className="flex flex-row justify-evenly items-center mb-7">
                                <a href={recommendedHD.link} target="_blank" className={productCard_styles + "p-2"}>
                                    <div className="py-5">
                                        <div><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={240} height={192}/></div>
                                        <span className="text-base font-normal ml-2">
                                            {recommendedHD.size} Hard Drive  
                                            <span className={"text-green-600 font-normal " + (recommendedHDMultiplier ? '' : 'hidden')}> x{recommendedHDMultiplier}</span>
                                        </span>
                                    </div>
                                </a>
                                <div className="text-4xl mx-3 text-green-700">+</div>
                                <a href={additionalHD.link} target="_blank" className={productCard_styles + "p-2"}>
                                    <div className="py-5">
                                        <div><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={240} height={192}/></div>
                                        <span className="text-base font-normal ml-5">
                                            {additionalHD.size} Hard Drive 
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <div className="px-16 mt-10 mb-5">
                            <Image src="/images/BS_logo.png" width={400} height={106}/>
                        </div>
                        
                        
                    </div>
                </div>
                </section>
            </div>
        
        
        </div>
        </>
    )
}