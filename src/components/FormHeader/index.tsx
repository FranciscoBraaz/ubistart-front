// Styles
import './index.scss'

function FormHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className='form-header'>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default FormHeader
