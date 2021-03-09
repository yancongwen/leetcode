/*
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-08 11:33:47
 * @Description: 堆排序
 */
class Heap {
    constructor() {
        this.data = [0]
    }

    get count() {
        return this.data.length - 1
    }

    get deep() {
        return Math.ceil(Math.log(this.count + 1) / Math.log(2))
    }

    // 插入新数据，自下向上堆化
    insert(value) {
        let data = this.data
        data.push(value)
        let i = this.count
        let p = Math.floor(i / 2)
        while (p && data[p] < data[i]) {
            swap(data, p, i)
            i = p
            p = Math.floor(i / 2)
        }
    }

    // 移除最大值
    shift() {
        let max = this.data[1]
        swap(this.data, 1, this.count)
        this.data.pop()
        this.heapify()
        return max
    }

    // 自顶向下堆化
    heapify() {
        let i = 1
        let data = this.data
        while (i <= this.count) {
            let max = i
            const left = 2 * i
            const right = 2 * i + 1
            if (left <= this.count && data[max] < data[left]) max = left
            if (right <= this.count && data[max] < data[right]) max = right
            if (max === i) break
            swap(data, i, max)
            i = max
        }
    }

    // 分层打印
    console() {
        let data = this.data
        for (let i = 0; i < this.deep; i++) {
            let row = []
            for (let j = Math.pow(2, i); j < Math.pow(2, i + 1); j++) {
                if (data[j] !== undefined) {
                    row.push(data[j])
                }
            }
            console.log(row.join(','))
        }
    }
}

function swap(A, i , j) {
    [A[i], A[j]] = [A[j], A[i]]
}

function sort(a) {
    const len = a.length
    const heap = new Heap()
    for (let i = 0; i < len; i++) {
        heap.insert(a[i])
    }

    for (let i = 0; i < len; i++) {
        a[len - i - 1] = heap.shift()
    }
    return a
}

let res = sort([1, 2, 4, 3, 4, 5, -1])
console.log(res)
