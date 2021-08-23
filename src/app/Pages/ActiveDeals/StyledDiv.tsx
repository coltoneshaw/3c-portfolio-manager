import styled from 'styled-components'

export default styled.div`
    overflow: auto;


  table {
    border-spacing: 0;
    background-color: var(--color-background-light);
    color: var(--color-text-lightbackground);
    font-size: .875em;
    min-width: 1200px;
    width: 100%;
    

    th,
    td {
      margin: 0;
      padding: 0.3rem .2rem .3rem .2rem;
    }

    thead tr:nth-child(1) th {
        position: sticky;
        top: 0;
        z-index: 100;
    }

    thead tr:nth-child(2) th {
        position: sticky;
        top: 53px;
        z-index: 100;
    }

    
    tbody{

        tr {
            :nth-child(2n+2) {
                background-color: var(--color-secondary-light87);
            }
    
            :hover {
                background-color: var(--color-secondary-light25);
                color: var(--color-text-darkbackground);

            }
        };

        .pill {
            padding: .1em;
            display: block;
            border-radius: 10px;
            color: white;
            font-weight: 700;
        }

        .red {
            background-color: var(--color-red);
            opacity: var(--opacity-pill);
        }

        .green {
            background-color: var(--color-green);
            opacity: var(--opacity-pill)
        }
    }


  }
`