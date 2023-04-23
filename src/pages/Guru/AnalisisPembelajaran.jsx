import React from 'react'
import { Breadcrumb, Panel } from 'rsuite'

const AnalisisPembelajaran = () => {
  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb>
              <Breadcrumb.Item>Instrumen 1</Breadcrumb.Item>
              <Breadcrumb.Item active>Analisis</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
      >
      </Panel>
    </>
  )
}

export default AnalisisPembelajaran