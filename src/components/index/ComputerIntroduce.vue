<script>
</script>

<template>
    <div class="computer-introduce">
        <div class="computer-introduce-container">
            <div class="computer-introduce-container-content">
                电脑
            </div>
        </div>
    </div>

</template>

<style scoped>
.computer-introduce {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    z-index: 1;
}

.computer-introduce::before {
    content: "";
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
    background-image: url('/bg_computer.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0.8;
    z-index: -1;
}

.computer-introduce-container {
    width: 90%;
    height: 73vh;
    margin-top: 5vh;
    margin-bottom: 15vh;
    margin-left: 1.3vw;
    /* background-color: #fff; */
}
</style>