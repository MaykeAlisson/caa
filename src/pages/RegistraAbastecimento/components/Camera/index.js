import React from "react";
import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import CameraIcon from "@material-ui/icons/Camera";

const Componente = ({
  exibirBtn,
  initializeCamera,
  girarCamera,
  captura
}) => {

    return (
        <>
            <Button
                style={exibirBtn ? {display: 'none'} : {display: 'inline-block'}}
                onClick={initializeCamera}>
                <AddAPhotoIcon/>
            </Button>
            <Button
                style={exibirBtn ? {display: 'inline-block'} : {display: 'none'}}
                onClick={girarCamera}
            >
                <FlipCameraAndroidIcon/>
            </Button>
            <Button
                style={exibirBtn ? {display: 'inline-block'} : {display: 'none'}}
                onClick={captura}
            >
                <CameraIcon/>
            </Button>
        </>
    );

}

Componente.propType = {
    exibirBtn: PropTypes.bool,
    initializeCamera: PropTypes.func,
    girarCamera: PropTypes.func,
    captura: PropTypes.func,
};

Componente.defaultProps = {
    exibirMenu: false,
    initializeCamera: () => {},
    girarCamera: () => {},
    captura: () => {},
};


export default Componente;