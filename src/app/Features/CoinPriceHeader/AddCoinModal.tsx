import React, { useState } from "react";

import {
    Dialog,
    DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useThemeProvidor } from "@/app/Context/ThemeEngine";



const AddCoinModal = ({ open, setOpen, coinNames, currentCoins }: { open: boolean, setOpen: any, coinNames: string[], currentCoins: {selectedCoins: string[], updateSelectedcoins:any} }) => {

    // make this version handler use the version that the user is using.

    const [inputValue, changeInputValue] = useState('')

    let { selectedCoins, updateSelectedcoins} = currentCoins

    const handleClose = () => {
        setOpen(false);
    };

    const theme = useThemeProvidor()
    const { styles } = theme


    // 1. Show existing coins in the header
    // 2. give ability to delete these coins


    // 3. add a search for new coins that uses the coins returned from binance and possibly a dynamic filter
    // 4. Save the coin to the header and to the localData

    const deleteCoin = (coin:string) => {
        updateSelectedcoins((prevState: string[]) => prevState.filter(c => c !== coin))
    }

    const addCoin = () => {
        changeInputValue(selectedValue => {
            updateSelectedcoins((prevState: string[]) => [...prevState, selectedValue])
            return ''
        })
    }


    return (
        <Dialog
            fullWidth={false}
            maxWidth="md"
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            style={{

                color: 'var(--color-text-lightbackground)',
                padding: 0,
                ...styles,

            }}
        >
            <DialogContent style={{ padding: 0 }}>
                <div className="flex-row addCoinModal">
                    <CloseIcon className="closeIcon" onClick={handleClose} />

                    <div className="flex-column" style={{width: '100%'}}>
                        <h2>Coins</h2>

                        {
                            selectedCoins.map( coin => (
                                <div className="flex-row selectedCoinDiv" >
                                    <p style={{flexBasis: '90%'}}>{coin}</p>
                                    <Delete 
                                        style={{
                                            flexBasis: '10%',
                                            cursor: 'pointer'
                                        }} 
                                        onClick={() => {
                                            deleteCoin(coin)
                                        }}
                                    />
                                </div>
                            ))
                        }

                        <div className="addCoinDiv flex-row">
                            <Autocomplete
                                options={['', ...coinNames]}
                                // getOptionLabel={(option) => option.title}
                                style={{ flexBasis: '90%', paddingRight: '2em' }}
                                value={inputValue}
                                //@ts-ignore
                                onChange={(e) => changeInputValue(e.target.innerText)}
                                renderInput={(params) => <TextField {...params} label="Add Coin" variant="outlined" 
                                
                                />}
                            />
                            <AddIcon 
                                style={{
                                    flexBasis: '10%',
                                    cursor: 'pointer'

                                }} 
                                onClick={() => { 
                                    addCoin()
                                }}
                            />
                        </div>


                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )
}

export default AddCoinModal;