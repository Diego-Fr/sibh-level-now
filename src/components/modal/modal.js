import { useRef, useState, memo, useEffect, useCallback } from 'react'
import './modal.scss'
import { useDispatch, useSelector } from 'react-redux'

const Modal = memo((props) =>{
    const [show, setShow] = useState(false)
    const modalRef = useRef(null)
    const show_chart_of = useSelector(store => store.stationReducer.show_chart_of)
    const dispatch = useDispatch(store => store.stationReducer)

    const controlVisibility = useCallback(_ =>{
        modalRef.current.style = `display:${show ? 'flex' : 'none'}`
        setTimeout(_=>modalRef.current.classList.toggle('show', show), 10)
    }, [modalRef, show])

    useEffect(()=>{
        controlVisibility()
    }, [show,controlVisibility])

    useEffect(()=>{
        setShow(show_chart_of ? true : false)
    },[show_chart_of])

    useEffect(()=>{
        modalRef.current.addEventListener('click', (e) =>{
            if(e.target.classList.contains('modal')){
                dispatch({type: 'HIDE_CHART', value: null})
            }
        })
    },[])

    return (
        <div className={"modal fade"} ref={modalRef}>
            <div className="modal-title">
                {props.title}
            </div>
            <div className="modal-body">
                {props.body}
            </div>
        </div>
    )
})

export default Modal