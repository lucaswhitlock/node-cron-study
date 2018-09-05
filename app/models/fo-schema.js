import mongoose from 'mongoose';
import StatusFO from '../models/status-fo-enum';

var foSchema = new mongoose.Schema({
  foAluno: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Alunos' }],
  foMonitor: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Monitores' }],
  foAgravantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Atenuantes' }],
  foAtenuantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agravantes' }],
  foResponsavel: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pais' }],
  foDescricao: { type: String, required: true },
  foJustificativa: { type: String },
  foTipo: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'TipoFOs'}],
  foStatus: { type: StatusFO, required: true, default: StatusFO.ABERTO }
}, {
  collection: 'FOs',
  timestamps: true
});

export default mongoose.model('FOs', foSchema);
