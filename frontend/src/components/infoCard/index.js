import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './assets/css/infoCard.css'
function InfoCard(props){
return(
    <div className='login-info-card-main-div'>
        <div className='login-info-card-bar-div'>
            {/* <div className='login-info-card-bar-item-div'>
                <div className='login-info-card-bar-icon'>
                    <SearchIcon fontSize='large'/>
                </div>
                <div className='login-info-card-bar-text'>
                    Search
                </div>
            </div> */}
            {/* <div className='login-info-card-bar-item-div'>
                <div className='login-info-card-bar-icon'>
                    <SearchIcon fontSize='large'/>
                </div>
                <div className='login-info-card-bar-text'>
                    Search
                </div>
            </div> */}
            {/* <div className='login-info-card-bar-item-div'>
                <div className='login-info-card-bar-icon'>
                    <SearchIcon fontSize='large'/>
                </div>
                <div className='login-info-card-bar-text'>
                    Search
                </div>
            </div> */}
            {/* <div className='login-info-card-bar-item-div'>
                <div className='login-info-card-bar-icon'>
                    <SearchIcon fontSize='large'/>
                </div>
                <div className='login-info-card-bar-text'>
                    Search
                </div>
            </div>     */}
        </div>
        <div className='login-info-details'>
            <div className='login-info-details-head-1'>
            So why CatchTheMatch.com?
            </div>
            <div className='login-info-details-text-1'>
            We are the first and leading polygamy matchmaking service. <br/>
            We set up this service as we believe polygamy is a lifestyle choice that people make and those people deserve to be represented
            </div>
            <div className='login-info-details-div-2'>
                <div className='inside-div'>
                    <div className='login-info-details-head-1'>
                    What's CatchTheMatch.com
                    </div>
                    <div className='login-info-details-text-2'>
                    This is where an individual has more than one spouse and everyone is in agreement. This is not cheating and certainly is not bigamy. Polygamy is a choice and a way of life for thousands of people worldwide.
                    </div>
                </div>
                <div className='inside-div'>
                    <div className='login-info-details-head-1'>
                    What's a polygamist?
                    </div>
                    <div className='login-info-details-text-2'>
                    A polygamist is someone who practises polygamy. Most commonly this will be one man with multiple wives and this is becomes family unit.
                    All the wives are friends and are to be treated as equals.
                    </div>
                </div>
            </div>
            <div className='login-info-comment'>
            "Monogamy clearly isn't working as divorce rates are higher than they've ever been. It's time to try something else.” - Team GG
            </div>
        </div>
    </div>
)
}

export default InfoCard