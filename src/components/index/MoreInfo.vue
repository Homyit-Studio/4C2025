<template>
    <div class="animation-container">
        <div id="holder">
            <!-- 原有动画结构保持不变 -->
            <div id="viewport">
                <div class="subviewport expl">
                    <div id="explosion">
                        <div id="explosion-circle"></div>
                    </div>
                </div>
                <div class="subviewport red">
                    <div class="circles">
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"></div>
                        <div class="circle-top"> </div>
                    </div>
                </div>

                <svg version="1.1" id="red-legs" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.189px" height="213.698px"
                    viewBox="0 0 239.189 213.698" enable-background="new 0 0 150 150" xml:space="preserve">
                    <path fill="none" stroke="#333333" stroke-width="2"
                        d="M148.126,179.477c64-17.334,4.667-27.333,2,16">
                        <animate attributeName="d" begin="0s" dur="0.96s" repeatCount="indefinite" values="M148.126,179.477c64-17.334,4.667-27.333,2,16;
                           M137.493,179.477c61.5-13.898,15.681-24.738,8,16;
                           M125.493,162.989c60.25,16.182,11.25-11.5,18,32.487;
                           M125.493,146.489c38.75,24.494,14.75,13.5,14.75,48.987;
                           M125.493,133.239c12.932,16.25,18.5,26.75,4,62.237;
                           M125.493,120.739c46,17.25,17.25,48.5-9,48.5;
                           M122.743,113.489c52.25,8,21.25,54.75,6.461,54.75;
                           M122.743,106.849c63.25,5.39,28,61.39,16.929,61.39;
                           M122.743,106.849c49.25,0,41.665,42.391,26.587,56.412;
                           M124.743,103.739c44.75,0,41.747,36.359,33.055,54.055;
                           M124.743,100.739c48.25,0,41.93,28.484,41.93,50.18;
                           M124.743,100.739c48.25,0,50.108,24.09,54.25,48.18;
                           M124.743,100.739c60,0,46.5,13.75,67.25,44;
                           M124.743,99.739c31.5,31.5,63.25,7.11,72.25,45;
                           M124.743,99.739c21.602,37.11,25.852,49.86,65.352,49.86;
                           M124.743,99.739c14.602,36.86,38.852,53.36,65.352,71.36;
                           M126.664,106.849c4.632,12.079,41.931,58.5,63.431,84;
                           M125.505,112.099c11.84,11.5,46.84,46.75,57.84,80;
                           M133.094,117.099c11.84,11.5,39.5,34.25,42.5,75;
                           M133.094,124.349c12.951,9.631,38,16,38,69.75;
                           M130.344,135.099c64,29.5,18.875,20.5,37.75,59;
                           M124.844,147.365c78.5,15.734,16.375,8.234,35.25,46.734;
                           M141.844,159.599c52,6,10.25-5.978,14.069,34.5;
                           M147.094,168.349c59.25-6.143,2.5-14.5,7,25.75
                           "></animate>
                    </path>
                    <path fill="none" stroke="#333333" stroke-width="2" d="M78.559,134c64-17.334,4.667-27.333,2,16">
                        <animate attributeName="d" begin="0s" dur="0.96s" repeatCount="indefinite" values="M80.126,156.81c-20.667,28.667-8.667,37.999,22,29.333;
                           M66.993,195.477c46,0,42.292-11.696,46-15.403;
                           M74.753,195.354c46,0,47.031-28.657,50.739-32.364;
                           M81.243,195.477c46,0,52-24.556,44.25-48.987;
                           M103.517,186.74c53.726-3.75,30.745-34.627,18.976-53.5;
                           M116.493,195.477c21.592-34.487,17.096-50.688,9-74.737;
                           M106.993,195.477c29.5-36.237,26.149-55.987,15.75-81.987;
                           M94.493,195.477c34.711-27.237,38.649-62.627,28.25-88.627;
                           M85.993,195.477c22.75-30.487,38.75-60.386,38.75-88.627;
                           M76.993,195.477c22.75-30.487,36-68.487,47.75-94.737;
                           M69.243,177.99c32-23,55.5-55.75,55.5-77.25;
                           M68.243,158.74c39-4.5,56.5-36.5,56.5-58;
                           M69.243,146.24c32,9,55.5-24,55.5-45.5;
                           M69.243,143.24c33.75,11.5,59-20.5,55.5-42.5;
                           M69.243,138.849c30.852,19.25,59-16.109,55.5-38.11;
                           M71.094,135.419c29.5,23.68,58.5-9.82,53.648-34.68;
                           M72.594,133.349c27.034,23.625,52.375,4.75,54.067-27.5;
                           M72.594,128.696c17,33.653,52.908,14.153,52.91-16.597;
                           M72.594,124.849c14,37.25,51.908,24,51.91-6.75;
                           M74.344,127.599c0,35.5,46.75,34.75,49.16-1.5;
                           M75.344,133.599c-2.5,36.5,44.75,36.75,47.16,0.5;
                           M75.259,137.373c-9.915,37.477,42.675,45.242,45.085,8.992;
                           M78.094,142.599c-12.75,31.5,19.75,45.25,35,19.5;
                           M78.094,151.349c-11.25,21-1.25,41.25,27.5,24.218;"></animate>
                    </path>
                </svg>

                <div class="hexagon dude" style="">
                    <div class="face"> </div>

                </div>

                <div class="subviewport orange">
                    <div class="circles">
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"></div>
                        <div class="circle-top"> </div>
                    </div>
                </div>

                <svg version="1.1" id="orange-legs" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.189px" height="213.698px"
                    viewBox="-30 0 239.189 213.698" enable-background="new 0 0 150 150" xml:space="preserve">
                    <path fill="none" stroke="#333333" stroke-width="2"
                        d="M-17.904,195.477c41.333-36.127,36-59.46,45.333-80.127">
                        <animate attributeName="d" begin="0.12s" dur="1.44s" repeatCount="indefinite" values="M-17.904,195.477c41.333-36.127,36-59.46,45.333-80.127;
                           M-21.906,195.477c42.25-32.377,41.687-57.056,49.335-80.127;
                           M-24.906,194.1c42.75-27.75,45.546-53.48,52.335-76.75;
                           M-24.906,194.1c42.75-27.75,43.068-44.52,49.857-67.789;
                           M-28.906,195.35c42.25-25,44.25-33.25,52.5-58;
                           M-35.906,194.35c30.065-8.45,47.75-16.5,58.029-42.744;
                           M-44.656,194.35c30,0,46.5,3,65.5-16.5;
                           M-34.656,186.35c30,0,36.263,1.735,49.49-8.916;
                           M-26.406,177.1c30,0,28.25,3,38.75-5.25;
                           M-16.156,169.35c30,0,27.536,0.544,37.792-5.166;
                           M-7.694,161.773c30,0,54.289-7.674,46.289-26.924;
                           M1.973,154.062c32.622,0,50.622-8.674,42.622-27.924;
                           M10.204,158.273c32.89,1.076,50.64-19.337,30.14-38.674;
                           M18.844,162.85c32.89,1.076,43-30.5,20.25-45.25;
                           M26.094,166.85c33.75-4.25,35.75-37.75,12-51.25;
                           M28.844,168.1c30.25-4.75,32.5-42,9.25-52.5;
                           M34.094,169.6c27-5.25,27.5-47.5-2-55;
                           M43.594,175.35c20-18,16.75-55.25-14.75-59.25;
                           M53.344,182.1c13.25-25.25,6.542-58.25-24.5-63.875;
                           M58.594,186.183c5.093-25-2.5-58.333-31.167-64.5;
                           M62.928,188.35c0.969-25.167-10.613-49.714-30-60.333;
                           M70.928,194.85c-15.667-26.833-30.333-41.5-42.5-60.333;
                           M61.261,194.85c-4-30.167-8.333-31.667-21.833-48.667;
                           M53.761,194.85c0.667-43.833-3-5.833-28.333-37.5;
                           M47.219,193.975c-8.125-48.75,28.25-1-15.125-21.125;
                           M45.25,193.975c-7.655-42.625,21.97-10.875-7.655-21.375;
                           M39.344,193.975c-7.125-30.375,17-22.875-1.75-30.375;
                           M30.719,193.975c-4.125-23.625,15.875-32.5,4.5-42.5;
                           M-4.656,165.1c44.25,7.375,52-19.25,39.113-27.375;
                           M5.844,153.975c44.25,7.375,52-17.75,31-27.25;
                           M12.344,156.475c43.25,5.25,45.5-28.625,20.875-35;
                           M18.719,159.225c42.75-3.125,37.375-37,13-40.5;
                           M24.469,162.475c35.75-6.625,31.875-42.375,9.5-46.875;
                           M30.928,165.017c31-9.792,26.167-44.334,6.84-51.167;
                           M39.928,170.683c18.251-11.833,19.167-44.333-4.16-57.833;
                           M49.094,177.017c9.803-18.454,8.5-50.334-13.326-64.167;
                           M58.094,182.85c3.129-25.685-1.833-57-25.167-70.333;
                           M67.428,190.183c-2.167-25.833-21.424-66.333-41.833-77.666;"></animate>
                    </path>

                    <path fill="none" stroke="#333333" stroke-width="2"
                        d="M27.429,113.85c25.415,25.25,32.665,37,40.165,77.25">
                        <animate attributeName="d" begin="0.12s" dur="1.44s" repeatCount="indefinite" values="M27.429,113.85c25.415,25.25,32.665,37,40.165,77.25;
                           M27.429,113.85c17.415,28.25,31.165,39.5,42.915,79;
                           M29.429,118.1c18.024,31.027,22.165,39.25,42.665,74.75;
                           M30.594,128.1c13.25,33.5,15.25,32.375,41.5,64.75;
                           M27.594,135.6c11.5,29.25,41.5,41.75,35.5,58.5;
                           M32.594,158.85c13.122,28.5,34.25,3.75,21.25,35.25;
                           M29.844,172.978c34.5,40.722,31.25-28.628,15.224,20.122;
                           M37.094,170.35c27.75,21.334,11.5-14.75,1.964,21.334;
                           M38.844,163.85c10.5,15.125,0,0-7.5,30.25;
                           M34.344,152.6c8,14.22-1.75,14.22-10,41.5;
                           M31.097,139.6c1.891,15.283-4.503,27.22-12.753,54.5;
                           M28.094,130.35c-4.472,15.25-8.043,36.47-16.293,63.75;
                           M28.094,122.6c-1.126,3.839-8.691,32.453-20.5,71.5;
                           M25.844,117.6c-1.126,3.839-11.119,37.418-22.927,76.465;
                           M24.094,115.1C22.969,118.938,11.547,155.6-1,194.064;
                           M24.094,115.1C22.969,118.938,10.547,154.6-2,193.064;
                           M24.094,115.1C22.969,118.938,10.547,154.6-2,193.064;
                           M24.094,115.1c-1.126,3.839-11,43-28,79;
                           M23.261,118.225C21.838,130.457,9.928,171.017-8.072,194.1;
                           M25.428,119.85c-1.833,15.333-15.833,51.833-35.667,74.25;
                           M24.116,126.688c-1.833,15.333-16.355,50.829-39.021,67.412;
                           M23.428,132.517c-1.833,15.333-19.167,44.75-41.833,61.333;
                           M22.761,141.183c-7.833,27.834-24.833,42-47.667,53.667;
                           M22.761,152.85c-13.5,28.333-33.333,40.5-53.667,42;
                           M22.761,176.475c-24.667,21-38.167,18.756-57.417,18.756;
                           M13.566,182.473C0,192.162-11.156,193.6-31.656,192.35;
                           M14.094,178.225c-11.75,9.5-18.5,7.625-39,6.375;
                           M34.457,152.85c0,8.375-12.613,30.375-49.863,21.875;
                           M30.344,140.35c0.75,9.875-5.625,29.875-9.5,53.375;
                           M21.469,138.1c0.75,9.875-4.875,32.125-8.75,55.625;
                           M22.594,127.85c0.039,9.625-9.625,42.375-13.5,65.875;
                           M23.344,121.475c0.039,9.625-13.625,48.75-17.5,72.25;
                           M23.344,116.725c0.037,9.146-16.417,52.792-21.25,77;
                           M23.344,114.517c-0.75,9-18.583,56.307-24.917,79.208;
                           M24.594,112.517c-0.75,9-16.833,60-29.833,81.208;
                           M24.594,112.517c-2.167,23.5-17.583,65.833-35.167,81.208;
                           M25.594,112.517c-1.167,23-15.5,64.5-40.333,81.208;
                           M25.594,112.517c-1.167,23-16,65.333-43.5,81.166;"></animate>
                    </path>
                </svg>

                <div class="box dude" style="
                       ">
                    <div class="face" style="
                          "></div>
                </div>

                <div class="subviewport green" style="
                       ">
                    <div class="circles">
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"></div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                    </div>
                </div>

                <div class="rectangle dude">
                    <div class="face"> </div>
                </div>

                <div class="subviewport blue" style="
                       ">
                    <div class="circles">
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"> </div>
                        <div class="circle-top"></div>
                        <div class="circle-top"></div>
                        <div class="circle-top"> </div>
                    </div>
                </div>

                <div class="circle dude">
                    <div class="face"> </div>
                </div>
            </div>
        </div>

        <!-- 右侧提示文字 -->
        <div class="coming-soon">
            <div class="text-container">
                <span>更</span>
                <span>多</span>
                <span>精</span>
                <span>彩</span>
                <br>
                <span>敬</span>
                <span>请</span>
                <span>期</span>
                <span>待</span>
            </div>
        </div>
    </div>
</template>

<script setup>
// 可以在这里添加交互逻辑（如果需要）
</script>

<style scoped>
/* 保持原有所有动画样式 */
.animation-container {
    position: relative;
    width: 1200px;
    margin: 0 auto;
}

.coming-soon {
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
}

.text-container {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-family: 'Microsoft YaHei', sans-serif;
    font-size: 2.8rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.8;
    animation: textGlow 2s ease-in-out infinite;
}

.text-container span {
    display: inline-block;
    margin: 0 8px;
    transform: rotate(5deg);
    transition: transform 0.3s ease;
}

.text-container span:hover {
    transform: rotate(-5deg) scale(1.1);
    color: #fff;
}

@keyframes textGlow {

    0%,
    100% {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
            0 0 10px rgba(255, 255, 255, 0.5);
    }

    50% {
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(255, 255, 255, 0.8);
    }
}

#holder {
    width: 800px;
    height: 500px;
    position: relative;
    background: #21282d;
}

div#viewport {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    bottom: 180px;
}


.circles {
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    word-break: normal;
    white-space: nowrap;
}

.red {
    width: 605px;
}

.expl {
    width: 800px;
}

.red .circles {
    animation: toleftR 0.96s linear infinite;
    height: 132px;
    margin-left: -132px;
}

.circle-top {
    border-radius: 50%;
    display: inline-block;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.red .circle-top {
    width: 264px;
    height: 264px;
    border: 11px solid hsl(0, 60%, 75%);
    margin-left: -10px;
}


@keyframes toleftR {
    0% {
        transform: translateX(0)
    }

    100% {
        transform: translateX(-254px)
    }
}

@keyframes toleftO {
    0% {
        transform: translateX(0)
    }

    100% {
        transform: translateX(-188px)
    }
}

@keyframes toleftG {
    0% {
        transform: translateX(0)
    }

    100% {
        transform: translateX(-130px)
    }
}

@keyframes toleftB {
    0% {
        transform: translateX(0)
    }

    100% {
        transform: translateX(-62px)
    }
}

div#explosion {
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    width: 600px;
    height: 100%;
    left: 100px;
}

div#explosion-circle {
    animation: explosion 2.88s infinite;
    animation-timing-function: cubic-bezier(0.140, 0.620, 0.405, 0.850);
    animation-direction: normal;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    opacity: 0.5;
}

@keyframes explosion {
    0% {
        opacity: 0;
        transform: translateX(0px) scale(0);
        background-color: hsl(355, 95%, 53%);
    }

    75% {
        opacity: 0.8;
        transform: translateX(0px) scale(0);
        background-color: hsl(355, 95%, 53%);
    }

    81.25% {
        background-color: hsl(200, 86%, 60%);
    }

    87.5% {
        background-color: hsl(120, 65%, 55%);
    }

    93.75% {
        background-color: hsl(60, 100%, 50%);
        opacity: 0.1;
    }

    100% {
        transform: translateX(-254px) scale(1);
        opacity: 0;
    }
}


.subviewport {
    left: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
}

.orange .circles {
    height: 98px;
    animation: toleftO 0.72s linear infinite;
    margin-left: 17px;
}

.orange {
    width: 505px;
}

.orange .circle-top {
    width: 200px;
    height: 200px;
    border: 10px solid hsl(43, 77%, 76%);
    margin-left: -10px;
}

.green {
    width: 425px;
}

.green .circle-top {
    width: 140px;
    height: 140px;
    border: 10px solid hsl(123, 55%, 73%);
    margin-left: -10px;
}

.green .circles {
    height: 70px;
    animation: toleftG 0.48s linear infinite;
    margin-left: -70px;
}


.blue {
    width: 365px;
}

.blue .circle-top {
    width: 70px;
    height: 70px;
    border: 8px solid hsl(200, 77%, 73%);
    margin-left: -8px;
}

.blue .circles {
    height: 35px;
    animation: toleftB 0.24s linear infinite;
    margin-left: -35px;
}



.hexagon {
    position: absolute;
    background-color: hsl(355, 95%, 53%);
    text-align: center;
    top: 263px;
    left: 594px;
    z-index: 1;
    animation-duration: 0.96s;
    animation-name: updownR;
}

.hexagon.dude,
.hexagon.dude::before,
.hexagon.dude::after {
    width: 32px;
    height: 53px;
    border-width: 2px 0 2px 0;
    border-style: solid;
}

.hexagon::before {
    background-color: inherit;
    content: "";
    position: absolute;
    transform: translateY(-2px) rotate(-60deg);
    z-index: 1;
    top: 0;
    left: 0;
    border-color: inherit;
}

.hexagon::after {
    background-color: inherit;
    content: "";
    position: absolute;
    transform: translateY(-2px) rotate(60deg);
    z-index: -1;
    top: 0;
    left: 0;
    border-color: inherit;
}

.box {
    top: 210px;
    left: 490px;
    position: absolute;
    width: 27px;
    height: 23px;
    background-color: hsl(22, 90%, 50%);

    z-index: 0;
    border-color: hsl(0, 0%, 30%);
    animation-duration: 1.44s;
    animation-name: updownO;
}

.box .face {
    width: 16px;
    height: 0;
    border-bottom: 3px solid;
    position: absolute;
    z-index: 5;
    top: 11px;
    left: 32px;
    border-color: inherit;
}

.box:before {
    width: 16px;
    height: 23px;
    position: absolute;
    content: "";
    top: -2px;
    right: -16px;
    background: inherit;
    border: inherit;
}

.box .face:after,
.box .face:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-color: inherit;
    border: 2px solid;
    border-radius: 50%;
    top: -6px;
    border-color: inherit;
}

.box .face:before {
    left: -4px;
}

.box .face:after {
    left: 3px;
}

.dude {
    position: absolute;
    border: 2px solid;
    padding: 0;
    z-index: 2;
    border-top-color: hsl(0, 0%, 20%);
    border-bottom-color: hsl(0, 0%, 20%);
    border-right-color: hsl(0, 0%, 20%);
    border-left-color: hsl(0, 0%, 20%);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

.rectangle {
    left: 411px;
    top: 302px;
    width: 21px;
    height: 12px;
    background: hsl(120, 65%, 55%);
    animation-duration: .48s;
    animation-name: updownG;
}

.rectangle .face {
    position: absolute;
    top: 7px;
    left: 18px;
    border-top: 3px solid;
    height: 0;
    width: 12px;
    border-color: inherit;
}

.rectangle .face:after {
    position: absolute;
    content: "";
    border-top: 2px solid;
    border-left: 2px solid;
    width: 1px;
    height: 1px;
    border-color: inherit;
    top: -8px;
    left: -1px;
}

.circle.dude {
    top: 277px;
    left: 355px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: hsl(200, 86%, 60%);
    animation-duration: .24s;
    animation-name: updownB;
}

.circle .face {
    position: absolute;
    left: 16px;
    top: 8px;
    width: 17px;
    border-top: 2px solid;
    border-color: inherit;
    z-index: 7;
}

.circle .face:after {
    border-top: 2px solid;
    border-color: inherit;
    width: 17px;
    top: -1px;
    content: "";
    position: absolute;
    transform-origin: 0 0;
    transform: rotateZ(8deg);
}

.circle .face:before {
    position: absolute;
    content: "";
    border-top: 2px solid;
    border-left: 2px solid;
    width: 1px;
    height: 1px;
    border-color: inherit;
    top: -7px;
    left: -4px;
    border-radius: 50%;
}

.hexagon .face {
    position: absolute;
    border-top: 3px solid;
    border-color: inherit;
    left: 8px;
    top: 8px;
    width: 26px;
    z-index: 2;
}

.hexagon .face:after {
    position: absolute;
    content: "";
    border-width: 0 3px 3px 0;
    border-style: solid;
    border-color: inherit;
    width: 8px;
    height: 21px;
    left: 12px;
    transform: skewX(11deg);
}

#red-legs {
    position: absolute;
    right: 73px;
    bottom: -20px;
}

#orange-legs {
    position: absolute;
    right: 110px;
    bottom: -20px;
}

@keyframes updownR {
    0% {
        transform: translateY(0px);
        animation-timing-function: cubic-bezier(0, .50, .50, 1);
    }

    50% {
        transform: translateY(-96px);
        animation-timing-function: cubic-bezier(.50, 0, 1, .50);
    }
}

@keyframes updownO {
    0% {
        transform: translateY(0px);
        animation-timing-function: cubic-bezier(0.585, 0.240, 0.865, 0.445);
    }

    25% {
        transform: translateY(75px) rotateZ(90deg);
        animation-timing-function: cubic-bezier(0.070, 0.405, 0.400, 0.820);
    }

    50% {
        transform: translateY(0px) rotateZ(180deg);
        animation-timing-function: cubic-bezier(0.585, 0.240, 0.865, 0.445);
    }

    75% {
        transform: translateY(75px) rotateZ(270deg);
        animation-timing-function: cubic-bezier(0.070, 0.405, 0.400, 0.820);
    }

    100% {
        transform: translateY(0px) rotateZ(360deg);
        animation-timing-function: cubic-bezier(0.585, 0.240, 0.865, 0.445);
    }
}

@keyframes updownG {
    0% {
        transform: translateY(0px) skewX(-25deg) scale(0.8, 1.8);
        animation-timing-function: cubic-bezier(0, .50, .50, 1);
    }

    50% {
        transform: translateY(-50px);
        animation-timing-function: cubic-bezier(.50, 0, 1, .50);
    }

    100% {
        transform: translateY(0px) skewX(25deg) scale(0.8, 1.8);
    }
}

@keyframes updownB {
    0% {
        transform: translateY(0px);
        animation-timing-function: cubic-bezier(.50, 0, 1, .50);
    }

    50% {
        transform: translateY(25px) scale(1.2, 1);
        animation-timing-function: cubic-bezier(0, .50, .50, 1);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>