import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import './modal_station.scss'

import chart_helper from "./helpers/chart";

const ModalStation = () =>{
    const station_id = useSelector(store=> store.stationReducer.show_chart_of)
    const [station, setStation] = useState({})
    const chartRef = useRef(null)

    useEffect(_=>{
        setStation({prefix: 'Prefixo', name: 'Nome do posto', measurements: []})
    },[station_id])    

    useEffect(_=>{
        let chart = chart_helper.generateChart(chartRef.current.getContext('2d'))

        return () => {
            chart.destroy(); //limpando
        };
    },[])

    return (
        <>
            <div className="modal-station-title">{station.prefix}</div>
            <div className="modal-station-subtitle">{station.name}</div>
            <div className="modal-station-chart-container mt-3">
                <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
            </div>
            
        </>
    )
}

export default ModalStation