import styles from "./CreatePost.module.css"
import { useState } from "react"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useAuthValue } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [imag, setImag] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const { user } = useAuthValue()

  const { insertDocument, response } = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(imag)
    } catch (error) {
      setFormError("A imegem precisa ser um URL.")
    }

    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase())

    if (!title || !imag || !tags || !body) {
      setFormError("Por favor preencha todos os campos.")
    }

    if (formError) return

    insertDocument({
      title,
      imag,
      body,
      tagsArray,
      uid: user.uid,
      cretedBy: user.displayName
    })

    navigate("/")

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento! </p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>UR da imagem</span>
          <input
            type="text"
            name="imagem"
            required
            placeholder="Insira uma imagem que representa eu post!"
            value={imag}
            onChange={e => setImag(e.target.value)}
          />
        </label>

        <label>
          <span>Contéudo</span>
          <textarea
            name="body"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Insira o contéudo do post!"
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por virgulas!"
            required
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default CreatePost
