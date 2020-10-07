import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Link from '@material-ui/core/Link';

export default () =>
    <Dialog
        open='true'
        aria-labelledby='form-dialog-title'>
        <DialogTitle
            id='form-dialog-title'
            style={{
                textAlign: 'center',
                color: 'FFA500'
            }}
        >
            ALERTA!
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <br/>
                SR(a) Cliente nosso sistema não e suportado por este navegador.
                <br/>
                Mude de navegador ou faça o dowloand {<Link href='http://google.com/chrome'>aqui</Link>}
            </DialogContentText>
            <br/><br/>
        </DialogContent>
    </Dialog>