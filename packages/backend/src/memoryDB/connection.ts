import mongoose from 'mongoose'
import { User } from 'src/models'
import bcrypt from 'bcrypt'
import { env } from 'src/configs'

export const connection = async () => {
  const connState = mongoose.connection.readyState

  if (connState.valueOf() !== 1) {
    await mongoose.connect(env.MONGODB_CONNECTION_STR, {
      dbName: 'test',
    })

    const userPassword = await bcrypt.hash('123456', 8)

    await User.findOneAndUpdate(
      { email: userMock.email },
      { ...userMock, password: userPassword },
      { upsert: true }
    )
  }
}

const userMock = {
  name: 'Usuário teste',
  email: 'desafio@bondy.com.br',
  company: 'Desafio Bondy',
}
