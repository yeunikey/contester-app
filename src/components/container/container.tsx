function Container({ parent, content, children }: { parent?: any; content?: any; children?: any }) {
  return (
    <div className={parent}>
      <div className='container'>
        <div className={content}>{children}</div>
      </div>
    </div>
  )
}

export default Container
