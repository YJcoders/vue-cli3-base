import throttle from '@/utils/throttle';

export default function lazyLoad(className, distance = 100) {
  // 获取图片列表
  const imgs = document.querySelectorAll(className);

  // 判断当前图片是否进入可视区域
  const imgList = Array.from(imgs);
  let len = imgList.length;

  getBound();

  // 添加滚动监听
  const mainDom = document.querySelector('#container');
  mainDom.addEventListener('scroll', throttle(getBound, 200));

  function getBound() {
    // 获取可视区的高度
    const clientHeght = window.innerHeight || document.documentElement.clientHeight;
    // 获取已滚动区域高度
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    // imgs
    for (let i = 0; i < len; i++) {
      const img = imgList[i];
      if (!img) return;
      // 获取图片距离最顶部高度（包括滚动区域）
      const bound = img.getBoundingClientRect();

      const height = bound.top - scrollTop;
      const gap = height - clientHeght;

      // 表示图片即将滚动到可视区，距离可视区还有100像素距离，开始加载图片
      if (gap <= distance) {
        img.src = img.dataset.src;
        // 设置src后，从列表中删除该数据，防止重复加载
        imgList.splice(i, 1);
        //
        i--;
        len--;

        // 都加载完成之后，清除滚动监听
        if (!len) mainDom.removeEventListener('scroll', throttle(getBound, 200));
      }
    }
  }
}
