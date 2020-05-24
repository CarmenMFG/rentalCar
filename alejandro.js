
async function request(nextFloor) {
    const accion=this.isOpen
    this.actions[accion]();    
    /*	if  {
					a();
				} else if (this.isOpen) {
				  b();
				} else {
				  c();
				}*/
            }
 async function a(){
    await this.openDoor();
 }   
 async function b(){
    await this.closeDoor();
    await this.move(nextFloor);
    await this.openDoor();
}           
async function c(){
    await this.move(nextFloor);
	await this.openDoor();
     
}  
const isInTheSameFloor=(nextFloor)=>(nextFloor === this.currentFloor);
const actions={
            [this.isOpen]:b 
};               