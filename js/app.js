
img_array = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg',
    'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg',
    'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png',
    'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']

let img_section = document.getElementById('img_section')
let left_img = document.getElementById('left')
let right_img = document.getElementById('right')
let mid_img = document.getElementById('mid')
let result_but = document.getElementById('result');
let result_div = document.getElementById('result_div')
let data_c = []
let labels_c = []
let privios_arr = []

let rounds = 25;
let c_round = 0;

function item(name, path) {
    this.name = name;
    this.path = path;
    this.shown = 0;
    this.clicked = 0;
    item.all.push(this)
}
item.all = []

for (let i = 0; i < img_array.length; i++) {
    new item(img_array[i].split('.')[0], img_array[i])
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_pic() {

    do{
        left_index = Random(0, img_array.length - 1)
    }
    while (privios_arr.includes(left_index));
    
    do{
        mid_index = Random(0, img_array.length - 1)
    } while ( mid_index === left_index || privios_arr.includes(mid_index))
    
     do{
         right_index = Random(0, img_array.length - 1)
     } while (right_index === left_index || right_index == mid_index ||(privios_arr.includes(right_index) )) 
     privios_arr =[]
    privios_arr.push (left_index,right_index,mid_index)

    left_img.src = 'img/' + item.all[left_index].path
    right_img.src = 'img/' + item.all[right_index].path
    mid_img.src = 'img/' + item.all[mid_index].path

    item.all[left_index].shown++
    item.all[right_index].shown++
    item.all[mid_index].shown++
    // console.log(privios_arr)

}

random_pic()

img_section.addEventListener('click', choose)

function choose(event) {
    if (c_round < rounds) {
        let id = event.target.id
        if (id === 'left' || id === 'mid' || id === 'right') {
            if (id === 'left') {
                item.all[left_index].clicked++
            }
            if (id === 'right') {
                item.all[right_index].clicked++
            }
            if (id === 'mid') {
                item.all[mid_index].clicked++
            }
            random_pic()

            c_round++
            // console.log(c_round)

        }
    }
    else {
        localStorage.data= JSON.stringify(item.all)
        img_section.removeEventListener('click',choose)
    }

}

result_but.addEventListener('click',show_result)

function show_result(event){
    result_div.innerHTML = ''
    let ul = document.createElement('ul')
    result_div.appendChild(ul)
    for (let i=0;i<item.all.length;i++){
        let li = document.createElement('li')
        li.textContent =`${item.all[i].name} had ${item.all[i].clicked} votes, and was seen ${item.all[i].shown} times.`
        ul.appendChild(li)
    }
    chart();
    localStorage.data= JSON.stringify(item.all)
}



function chart (){
    for (let i=0; i<item.all.length;i++){
        data_c.push(item.all[i].clicked)
        labels_c.push(item.all[i].name)
    }    
    let ctx = document.getElementById('myChart').getContext('2d');

    let myChart = new Chart(ctx, {
        
        type: 'bar',
        data: {
            labels: labels_c,
            datasets: [{
                label: '# of Votes',
                data: data_c ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

