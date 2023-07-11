/**
 * getRadian.
 *
 * @param {number} degree
 * @returns {number}
 */
export function getRadian(degree) {
  return (Math.PI * degree) / 180;
}

/**
 * getDegree.
 *
 * @param {number} radian
 * @returns {number}
 */
export function getDegree(radian) {
  return (radian * 180) / Math.PI;
}

/**
 * getX.
 *
 * @param {number} r
 * @param {number} radian
 * @param {number} [Cx=0]
 * @returns {number}
 */
function getX(r, radian, Cx = 0) {
  return Cx + r * Math.cos(radian);
}

/**
 * getY.
 *
 * @param {number} r
 * @param {number} radian
 * @param {number} [Cy=0]
 * @returns {number}
 */
function getY(r, radian, Cy = 0) {
  return Cy + r * Math.sin(radian);
}

/**
 * getEqualParts.
 *
 * @param {number} amount
 * @returns {number[]}
 */
function getEqualParts(amount) {
  const range = 360 / amount;
  return Array.from(Array(amount), (_, i) => i * range);
}

/**
 * getCirclePoints.
 *
 * @example
 * getCirclePoints(10, 100)
 * @param {number} amount
 * @param {number} radius
 * @param {[number, number]} [[Cx, Cy]=[0, 0]]
 * @returns {[number, number][]}
 */
export function getCirclePoints(amount, radius, [Cx, Cy] = [0, 0]) {
  return getEqualParts(amount).map((degree) => [
    Math.round(getX(radius, getRadian(degree), Cx)),
    Math.round(getY(radius, getRadian(degree), Cy)),
  ]);
}
