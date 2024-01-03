import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import './map.scss'
import stationHelper from '../../helpers/stationHelper';

const MapComponent = () =>{
    const stations_list = useSelector(store=>store.stationReducer.list)
    const mapContainer = useRef(null)
    const markersFeatureGroup = useRef(null)
    const previousStations = useRef(new Map())
    const markersList = useRef(new Map())
    const dispatch = useDispatch(store => store.stationReducer)

    const map = useRef(null);

    const handleZoomEnd = () =>{
        let current_zoom = map.current.getZoom()
    }

    //useCallBack para 'cachear' a função e não ser reescrita a cada reender do componente.
    const manageMarkers = useCallback(()=>{
        markersList.current.forEach((marker, id)=>{
            let station = stations_list.filter(x=>x.id === id)[0]
            if(!markersFeatureGroup.current.hasLayer(marker)){
                if(station && station.visible){
                    marker.addTo(markersFeatureGroup.current)
                }
            } else {
                if(station && !station.visible){
                    markersFeatureGroup.current.removeLayer(marker) 
                }
            }
        })
    }, [stations_list, markersList])
    
    //inicializar mapa caso precise
    useEffect(()=>{
        if (map.current) return 
        map.current = L.map(mapContainer.current).setView([51.505, -0.09], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.current);

        markersFeatureGroup.current = new L.featureGroup()

        markersFeatureGroup.current.addTo(map.current)

        map.current.on('zoomend', handleZoomEnd);
    },[])

    //criar markers para o mapa baseado na atual lista de postos
    /**
     * Toda a vez que a lista atualiza (seja completa ou apenas uma propriedade de um objeto) esse useEffect é ativado (isso é comportamento normal do react)
     * Esta sendo verificado se o objeto ja existia para evitar ficar criando marcador desnecessário (se ja existia = ja tem marker)
     * No final, um método auxiliar vai tratar de exibir ou não os marcadores, e após, um fitBounds é chamado
     */
    useEffect(()=>{

        let icon = L.divIcon({className: 'custom-icon'})
        stations_list.forEach(station=>{
            
            //verificando se ja existia essa estação em uma versão anterior do array
            const prevStation = previousStations.current.get(station.id)
            if(!prevStation){

                //marcador não existe, adicionando
                let marker = L.marker([station.lat, station.lng], {icon: icon})
                
                //escondendo no click (temporário)
                marker.on('click', () =>{
                    dispatch({type: 'SHOW_CHART',value: station.id})
                })
                
                // adicionando marker na lista de marcadores (necessário para controle de exibição)
                markersList.current.set(station.id, marker)
                
            }
        })

        //método que adiciona ou remove markers do mapa de acordo com as regras
        manageMarkers()

        //atualizando a lista de comparações dos postos
        previousStations.current = new Map(stations_list.map(station => [station.id, station]))

        if(markersFeatureGroup.current.getBounds().isValid()){
            map.current.fitBounds(markersFeatureGroup.current.getBounds())
        }

    },[stations_list,dispatch,manageMarkers])

    useEffect(_=>{
        stationHelper.getStations().then(data=>{
            console.log(data);
        }).catch(e=>{
            console.log(e);
        })
    },[])

    return (
        <div ref={mapContainer} style={{width:'100%', height:'100%'}}>
            
        </div>
    )
}

export default MapComponent