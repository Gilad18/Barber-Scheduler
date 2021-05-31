// export const DATABASE = 'http://localhost:3900/mybarber/api'
export const DATABASE = 'https://mybarber-schedule.herokuapp.com/mybarber/api'


export const avaiabilty = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'
    , '14:00', '14:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']


export const closingHoursFriday = ['16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']


export const theTypes = [
    { name: 'Haircut Only', price: 60 },
    { name: `Haircut & Beard`, price: 80 },
    { name: 'Dye Only', price: 120 },
    { name: 'Full Treatment', price: 185 }
]

export const adminActios = [
    {name : 'This Week Schedule', page:'/admin/week'},
    {name : 'Next Week Schedule', page:'/admin/week'},
    {name : 'Custom Date', page:'/admin/customdate'},
    {name : 'Manage Days Off', page:'/admin/mangedaysoff'}
]