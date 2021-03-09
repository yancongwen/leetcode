/*
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-09 10:18:41
 * @Description: 堆排序
 * 第一步：建立大顶堆，从最后一个非叶子节点开始，依次向前堆化处理；
 * 第二步：经过第一步建堆之后，堆的顶点即为最大值，将最大值和堆的最后一个节点交换，然后对前面的 n - 1 个节点继续堆化；
 * 第三步：重复第二个步骤，直至大顶堆节点数量变为1；
 */

function heapSort(A) {
    const n = A.length
    buildHeap(A, n)
    for (let i = 0; i < n; i++) {
        // 将最大值和最后一个节点交换，并堆化处理
        swap(A, 0, n - i - 1)
        heapify(A, n - i - 1, 0)
    }
    return A
}

// 建堆，从最后一个非叶子节点开始，依次向前堆化处理
function buildHeap(A, n) {
    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(A, n, i)
    }
}

// 从上往下堆化，堆化的过程就是比较节点和其左右子节点，如果子节点大于父节点，交换，循环以上过程直至节点无须交换或者到最后一层
function heapify(A, n, i) {
    while (true) {
        let max = i
        let left = i * 2 + 1
        let right = i * 2 + 2
        if (left < n && A[left] > A[max]) max = left
        if (right < n && A[right] > A[max]) max = right
        if (max === i) break
        swap(A, i, max)
        i = max
    }
}

// 交换
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]]
}
