import app from './app.js';
import { PORT } from './shared/config.js';
app.listen(PORT, () => console.log(`Metrofood API em http://localhost:${PORT}`));
