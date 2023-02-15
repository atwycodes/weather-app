import './style.scss'
import Data from './modules/Data.js'
import Display from './modules/Display.js'

const user = new Display(new Data())

user.initialLoad()
