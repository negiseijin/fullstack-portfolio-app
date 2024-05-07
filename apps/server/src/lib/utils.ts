// ランダムに3つの要素を抽出する関数
function getRandomElements(arr: string[], count: number): string[] {
  const shuffled = arr.slice(); // 元の配列をコピー
  shuffled.sort(() => Math.random() - 0.5); // 配列をシャッフル
  return shuffled.slice(0, count); // 先頭から指定された個数の要素を抽出
}

// 3つの要素を取得
const randomElements = getRandomElements(["numbers", "numbers", "numbers"], 3);
console.log(randomElements);
