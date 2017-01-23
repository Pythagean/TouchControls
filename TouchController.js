import UnityEngine;
import System.Collections;

public class TouchController extends MonoBehaviour {
//public class TouchController : MonoBehaviour {

	//public AudioClip rockSound;
  public var rockSound : AudioClip;
	//public GameObject wall;
  public var wall : GameObject;
	//public OVRInput.Controller Controller;
  public var Controller : OVRInput.Controller;
	//private AudioSource source;
  public var source : AudioSource;
	//public GameObject Player;
  public var Player : GameObject;

  public var Hand : String;

	//private Transform toLane;
  //private var 

	//private int wallCooldownCounterMax = 1000;
	//private int wallCooldownCounter = 1000;
	//private bool wallCooldown = false;
  
  private var wallCooldownCounterMax : int = 1000;
  private var wallCooldownCounter : int = 1000;
  private var wallCooldown : boolean = false;



	// Update is called once per frame
	//void Update () {
  function Update() {
		transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
		transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);

		//Debug.Log (wallCooldownCounter.ToString ());

		if (wallCooldown) {
			wallCooldownCounter--;
			if (wallCooldownCounter < 0) {
				wallCooldownCounter = wallCooldownCounterMax;
				wallCooldown = false;
			}
		}

		if (Input.GetAxis(Hand+"HandTrigger") == 1){
			pullUpWall("Hand: " + Hand);
		}

		//if (Input.GetAxis(Hand+"HandTrigger") == 1){
		//	pullUpWall("Left");
		//}





		if (Input.GetButtonDown("Fire1")) {
		}

	}

	function pullUpWall(hand : String){
	//if (Input.GetAxis("RHandTrigger") == 1 || Input.GetAxis("LHandTrigger") == 1) {
			//Debug.Log ("Right");
			Debug.Log("hand: " + hand);
			if (!wallCooldown){
				//Debug.Log (transform.position.ToString ());
        		wallCooldown = true;
		        var dir : Vector3 = Player.transform.position - transform.position;
		        dir = Player.transform.InverseTransformDirection(dir);
		        var angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

		        Debug.Log("transform.position: " + transform.position);

		        var radius : float = 5f;
		        var newPointLocation : Vector2 = GetPointOnCircle(transform.position, radius, angle);
				//Vector3 direction = (toLane.transform.position - transform.position).normalized;
				//Vector3 distance = Vector3.Distance(
				var test : Vector3 = new Vector3(2.5,-1.25,0);
				//Debug.Log("test: " + test);

				var createdWall : GameObject = Instantiate(wall, test, Quaternion.identity) as GameObject;

			}




		//}


	}
  
   function GetPointOnCircle(origin : Vector2, radius : float , angle : float ) {
 
        var angleInRadians : float = angle * Mathf.Deg2Rad;
 
        var x = origin.x + radius * Mathf.Sin(angleInRadians);
        var y = origin.y + radius * Mathf.Cos(angleInRadians);
 
        return new Vector2(x,y);
 
    }




}