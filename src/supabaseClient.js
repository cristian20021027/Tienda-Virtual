import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://bslgibfpbchwbjlnuyjp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzbGdpYmZwYmNod2JqbG51eWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NzIyMDIsImV4cCI6MjA2MjI0ODIwMn0.ay0tIcHPRLbPHNH2HPm4exh-dCBblFwIAU_W7jtcTvc';

// Crear y exportar la instancia de Supabase
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    }
  }
});

// Exportación como default
export default supabase;

// También como exportación nombrada para flexibilidad
export { supabase };