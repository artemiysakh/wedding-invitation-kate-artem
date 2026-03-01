import InvitationForm from '../form';
import Calendar from './calendar';
import inform_img from '../assets/information.jpg'
import shedule_img from '../assets/shedule_img.jpg'
import { ImWhatsapp } from "react-icons/im";


export default function Description() {
    return(
        <div id='description_div'>       
        <div className='section'>
            <h2 className='title_section'>ДОРОГИЕ ГОСТИ!</h2>
            <p className='text-greeting'>В нашей жизни произойдет очень
                важное событие – наша свадьба!
                Мы верим и надеемся, что этот день станет красивым началом
                долгой и счастливой жизни.</p>
        </div> 
        <div className='section'>
            <Calendar />  
        </div> 
         <div className='section'>
            <h2 className='title_section'>ПРОГРАММА</h2>
            <h2 className='title_section'>ДНЯ</h2>
            <img src={shedule_img} id='shedule_img'></img>
        </div>
        <div className='section'>
            <h2 className='title_section'>МЕСТО</h2>
                <h2 className='title_section'>ТОРЖЕСТВА</h2>
             <p className='text-greeting'>Банкетный зал "Заберег" 
                Ленинградская область, 41К-313, 30</p>
        </div>
        <div className='section'>
            <h2 className='title_section' style={{marginBottom:'20px'}}>ДЕТАЛИ</h2>
            <img src={inform_img} id='inform_img'></img>
        </div>
        <div className='section'>
            <h2 className='title_section'>ДРЕСС-КОД</h2>
             <p className='text-greeting'>Будем признательны, если вы поддержите цветовую гамму нашей свадьбы</p>
             <div id='dress-code'>
                <div className='dress-code-color' style={{backgroundColor: '#000000'}}></div>
                <div className='dress-code-color' style={{backgroundColor: '#9E9E9E'}}></div>
                <div className='dress-code-color' style={{backgroundColor: '#F0DFE7'}}></div>
                <div className='dress-code-color' style={{backgroundColor: '#D4E2EB'}}></div>
                <div className='dress-code-color' style={{backgroundColor: '#F8F3ED'}}></div>
             </div>
        </div>
        <div className='section'>
            <InvitationForm />
        </div>
        <div className='section'>
            <h2 className='title_section'>ОСТАЛИСЬ</h2>
            <h2 className='title_section' style={{marginBottom: '18px'}}>ВОПРОСЫ?</h2>
            <p className='numbers_phone'>Жених:  8 (999)-999-99-99</p>
            <ImWhatsapp style={{fontSize: '24px'}}/>
            <p className='numbers_phone'>Невеста:  8 (914)-090-86-40</p>
            <ImWhatsapp style={{fontSize: '24px'}}/>
            <p className='numbers_phone'>Ведущий:  8 (999)-999-99-99</p>
            <ImWhatsapp style={{fontSize: '24px'}}/>
        </div>
        </div>
    )
}
