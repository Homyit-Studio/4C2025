<script>
</script>

<template>
    <div class="computer-introduce">
        电脑
    </div>

</template>

<style scoped>
.computer-introduce {
    width: 100%;
    height: 100%;
    /* background-color: #f00; */
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
</style>