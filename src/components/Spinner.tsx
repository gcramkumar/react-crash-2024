import { ClipLoader }  from 'react-spinners'

const override = {
  display: 'block',
  margin: '100px auto'
};

const Spinner = ({loading}) => {
  return (
    <div>
      <ClipLoader 
        color = "#4B5563"
        loading = {loading}
        cssOverride={override}
        size={150}
      />
    </div>
  )
}

export default Spinner
