import React from 'react';
import {Component} from 'react';
import {Fragment} from 'react';

import isEmpty from '../../util/isEmpty';
import Mensagem from './CustomMsg';

const comCustomMsg = WrappedComponent => {

    return class extends Component {

        constructor(props) {

            super(props);

            this.state = {
                customMsg: {
                    open: false
                }
            }
        }

        exibirMsg = obj => this.setState({
            customMsg: {
                open: true,
                ...obj
            }
        });

        fecharMsg = () => this.setState({
            customMsg: {
                open: false,
                msgInfo: '',
                msgSucesso: '',
                msgAviso: '',
                msgErro: ''
            }
        });

        msgInfo = msg => this.exibirMsg({msgInfo: msg});

        msgSucesso = msg => this.exibirMsg({msgSucesso: msg});

        msgAviso = msg => this.exibirMsg({msgAviso: msg});

        msgErro = msg => this.exibirMsg({msgErro: msg});

        msgFromObj = obj => {
            if (!isEmpty(obj)) {
                const existe = obj.hasOwnProperty('msgFromObj')
                    || obj.hasOwnProperty('msgInfo')
                    || obj.hasOwnProperty('msgSucesso')
                    || obj.hasOwnProperty('msgAviso')
                    || obj.hasOwnProperty('msgErro');
                if (!existe) obj = {msgFromObj: {...obj}};
                this.exibirMsg(obj);
            }
        };

        render() {

            return (
                <Fragment>
                    <WrappedComponent
                        msgInfo={this.msgInfo}
                        msgSucesso={this.msgSucesso}
                        msgAviso={this.msgAviso}
                        msgErro={this.msgErro}
                        msgFromObj={this.msgFromObj}
                        {...this.props}
                    />
                    <Mensagem
                        onClose={() => this.fecharMsg()}
                        { ...this.state.customMsg }
                    />
                </Fragment>
            );

        }
    }
};

export default comCustomMsg;